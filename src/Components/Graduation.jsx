import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Graduation() {
  const { studentId } = useParams();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const checkEligibility = async () => {
    try {
      // Replace with the actual API endpoint for checking graduation eligibility
      const response = await axios.post(`http://localhost:8080/courseselection/checkGraduationStatus/${studentId}`);
      setStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const generateInvoice = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/courseselection/createinvoice/${studentId}`);
      setMessage(`Invoice generated successfully: ${response.data}`);
      setInvoiceGenerated(true);
    } catch (error) {
      setMessage('Invoice already generated');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Graduation</h2>
      <p>
        You need to pay all the outstanding tuition and library fees before you
        are eligible to graduate.
      </p>
      {status && (
      <p>
        Your current status:{' '}
        {status === 'GRADUATED' ? (
          <span style={{ color: 'green' }}>eligible to graduate</span>
        ) : (
          <span style={{ color: 'red' }}>not eligible to graduate</span>
        )}
      </p>
    )}
      <button
        className='btn btn-primary'
        style={{
          backgroundColor: '#7532f9',
          border: '2px solid #7532f9',
          boxShadow:
            '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)',
        }}
        onClick={checkEligibility}
      >
        Check Eligibility
      </button>
      {!invoiceGenerated && (
        <button
          className='btn btn-primary ms-2'
          style={{
            backgroundColor: '#7532f9',
            border: '2px solid #7532f9',
            boxShadow:
              '0 2px 2px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.1)',
          }}
          onClick={generateInvoice}
        >
          Generate Invoice
        </button>
      )}
      {message && (
        <p style={{ color: invoiceGenerated ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
}

export default Graduation;
