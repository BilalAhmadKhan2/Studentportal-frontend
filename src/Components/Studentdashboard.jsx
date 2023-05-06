
import { Link, useNavigate, useParams } from 'react-router-dom';

function StudentDashboard() {
  const { studentId } = useParams();
  const navigate = useNavigate();
 

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    // Redirect the user to the login page
    navigate('/');
  };


  if (studentId) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#7532f9' }}>
          <div className="container-fluid">
            <span className="navbar-brand">Student ID: {studentId}</span>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={`/Viewallcourses/${studentId}`}>Courses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/Viewselected/${studentId}`}>Enrolled Course</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/ViewMyDetails/${studentId}`}>Personal Details</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/Graduation/${studentId}`}>Graduation</Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button className="btn btn-primary" style={{
                    backgroundColor: '#7532f9',
                    border: '2px solid #7532f9',
                    boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)'
                  }} onClick={handleLogout}>Log Out</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h1>Welcome to the Leeds Beckett Student portal!</h1>
        <h6>Note: You need to select 3 courses to generate invoice. To graduate, you need to pay all the invoices and dues. </h6>
        {/* Your dashboard content goes here */}
      </div>

    );
  } else {
    return (
      <div>
        <p>Please log in to view this page.</p>
        <Link to="/">Go back to login page</Link>
      </div>
    );
  }
}

export default StudentDashboard;
