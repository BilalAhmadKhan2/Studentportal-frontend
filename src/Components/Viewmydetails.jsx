import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function ViewMyDetails() {
  const [student, setStudent] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/studentAPI/getstudentdata/${studentId}`)
      .then(response => response.json())
      .then(data => setStudent(data));
  }, [studentId]);
  
  const handleLogout = () => {
    localStorage.removeItem('studentId');
    navigate('/');
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNameEdit = async () => {
    if (editingName) {
      if (validateName(newName)) {
        const response = await fetch(`http://localhost:8080/studentAPI/editname/${studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName }),
        });

        if (response.ok) {
          setStudent({ ...student, name: newName });
          setErrorMessage('');
        } else {
          setErrorMessage('Error updating name');
        }
      } else {
        setErrorMessage('Name can only contain alphabets and spaces');
      }
    }

    setEditingName(!editingName);
  };

  const handleEmailEdit = async () => {
    if (editingEmail) {
      if (validateEmail(newEmail)) {
        const response = await fetch(`http://localhost:8080/studentAPI/editemail/${studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newEmail }),
        });

        if (response.ok) {
          setStudent({ ...student, email: newEmail });
          setErrorMessage('');
        } else if (response.status === 409) {
          setErrorMessage('This email is already used by another user. Please use a different email.');
        }
      } else {
        setErrorMessage('Invalid email format');
      }
    }

    setEditingEmail(!editingEmail);
  };

  if (student) {
    const buttonStyle = {
      backgroundColor: '#7532f9',
      border: '2px solid #7532f9',
      boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)',
      marginLeft: '10px',
      color: 'white'
    };
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#7532f9' }}>
        <div className="container-fluid">
          <span className="navbar-brand">Student ID: {studentId}</span>
          <div className="navbar-nav ml-auto">
            <button className="btn btn-primary" style={buttonStyle} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div>
        <h2>My Details</h2>
        <p>Student ID: {studentId}</p>
        <p>
          Fullname:{' '}
          {editingName ? (
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          ) : (
            student.name
          )}{' '}
          <button onClick={handleNameEdit} style={buttonStyle}>
            {editingName ? 'Save' : 'Edit'}
          </button>
        </p>
        <p>
          Email:{' '}
          {editingEmail ? (
            <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          ) : (
            student.email
          )}{' '}
          <button onClick={handleEmailEdit} style={buttonStyle}>
            {editingEmail ? 'Save' : 'Edit'}
          </button>
        </p>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default ViewMyDetails;
