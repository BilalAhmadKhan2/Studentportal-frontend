import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewAllCourses() {
  const [courses, setCourses] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/courseAPI/getallcoursesdata')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    navigate('/');
  };

  const handleEnroll = async (course) => {
    if (Object.keys(enrollmentStatus).length >= 3) {
      alert("You have already enrolled in 3 courses");
      return;
    }
  
    const response = await fetch(`http://localhost:8080/courseselection/select?externalId=${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: parseInt(course.courseid, 10) }),
    });
  
    if (response.ok) {
      setEnrollmentStatus({ ...enrollmentStatus, [course.courseid]: 'success' });
    } else {
      const errorMessage = await response.text();
      setEnrollmentStatus({ ...enrollmentStatus, [course.courseid]: `error: ${errorMessage}` });
    }
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
      <h2>All Available Courses</h2>
      <h5>You can only enroll into 3 courses</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Course Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseid}>
              <td>DB{course.courseid}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.fee}</td>
              <td>
                {enrollmentStatus[course.courseid] === 'success' ? (
                  <span className="text-success">&#x2714;</span>
                ) : (
                  <>
                    <button
                      className="btn btn-primary" style={{
                        backgroundColor: '#7532f9',
                        border: '2px solid #7532f9',
                        boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleEnroll(course)}
                      disabled={enrollmentStatus[course.courseid] === 'loading'}
                    >
                      Enroll
                    </button>
                    {enrollmentStatus[course.courseid] &&
                      enrollmentStatus[course.courseid].startsWith('error') && (
                        <div className="text-danger">
                          {enrollmentStatus[course.courseid].substring(6)}
                        </div>
                      )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllCourses;
