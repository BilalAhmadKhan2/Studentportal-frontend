import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import StudentDashboard from './Components/Studentdashboard';
import ViewAllCourses from './Components/Viewallcourses';
import ViewSelected from './Components/Viewselectedcourses';
import ViewMyDetails from './Components/Viewmydetails';
import Graduation from './Components/Graduation';
import './App.css';

function App() {
  return (
    <div className='container border d-flex flex-column' style={{ height: '100vh', borderColor: 'black' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Studentdashboard/:studentId" element={<StudentDashboard />} />
          <Route path="/Viewallcourses/:studentId" element={<ViewAllCourses />} />
          <Route path="/Viewselected/:studentId" element={<ViewSelected />} />
          <Route path="/ViewMyDetails/:studentId" element={<ViewMyDetails />} />
          <Route path="/Graduation/:studentId" element={<Graduation />} />
        </Routes>
      </Router>
      <footer className='mt-auto text-center' style={{ backgroundColor: '#7532f9', color: 'white' }}>
        <div className='container py-3'>
          <div className='row'>
            <div className='col'>
              <p className='text-center'>
                &copy; 2023 Student Portal. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
