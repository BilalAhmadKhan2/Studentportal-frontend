import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginClick = () => {
    navigate('/');
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/studentAPI/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });
  
      const data = await response.text(); // Use .text() instead of .json()
  
      if (response.status === 201) {
        setRegisterError(`Registration successful. ${data}`);
      } else if (response.status === 409) {
        setRegisterError('Email already in use, Try other email');
      } else {
        setRegisterError('Try again');
      }
    } catch (error) {
      setRegisterError('Server is down, please try later');
    }
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
                <h1 className="card-title text-center mb-4">Register</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="name-addon">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      id="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                      aria-describedby="name-addon"
                    />
                  </div>

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
                      Register
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <button
                    className="link-btn btn btn-link"
                    onClick={handleLoginClick}
                  >
                    Already have an account? Login here
                  </button>
                </div>
                {registerError && <p className="text-danger mt-2">{registerError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;


