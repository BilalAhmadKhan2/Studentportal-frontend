import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Remove studentId from localStorage if it exists, effectively logging the user out
    localStorage.removeItem('studentId');
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/studentAPI/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login was successful, navigate to the dashboard page passing the student ID
        navigate(`/Studentdashboard/${data.studentId}`);
      } else {
        // Login failed, display an error message
        setLoginError('Incorrect Email or Password');
      }
    } catch (error) {
      // Handle error if server is down
      setLoginError('Server down, Try Later');
    }
  };
  
  const handleRegisterClick = () => {
    navigate('/Register');
  };

  return (

<>
  <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{ backgroundColor: '#7532f9' }}
  >
    <div className="container-fluid">
      <span className="navbar-brand">Student Portal</span>
    </div>
  </nav>

  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div
          className="card mt-5"
          style={{ borderColor: '#7532f9', borderWidth: '2px', borderRadius: '15px' }}
        >
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="email-addon">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  aria-describedby="email-addon"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="************"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  aria-describedby="password-addon"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: '#7532f9', color: 'white' }}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <button className="link-btn btn btn-link" onClick={handleRegisterClick}>
                Don't have an account? Register here
              </button>
            </div>
            {loginError && <p className="text-danger mt-2">{loginError}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
</>


  );
}

export default Login;
