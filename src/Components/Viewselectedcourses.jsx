import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewSelectedcourses() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/courseselection/selectedcourses/${studentId}`)
      .then(response => response.json())
      .then(data => setSelectedCourses(data));
  }, [studentId]);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#7532f9' }}>
        <div className="container-fluid">
        <span className="navbar-brand">Student ID: {studentId}</span>
          <div className="navbar-nav ml-auto">
            <button className="btn btn-primary" style={{
                    backgroundColor: '#7532f9',
                    border: '2px solid #7532f9',
                    boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)'
                  }} onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </nav>
      {selectedCourses.length > 0 ? (
        <>
          <h2>Selected Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Description</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map(course => (
                <tr key={course.id}>
                  <td>DB{course.courseid}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="alert alert-danger" role="alert">
          You have no enrolled courses. Go to courses to select and enroll into your desired courses.
        </div>
      )}
    </div>
  );
}

export default ViewSelectedcourses;
