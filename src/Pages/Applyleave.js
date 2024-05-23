import React, { useState } from 'react';
import './Applyleave.css';
import { useNavigate } from 'react-router-dom';
function LeaveApplication() {
  const [leaveDetails, setLeaveDetails] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails(prevState => ({
      ...prevState,       
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(leaveDetails);
   
    setLeaveDetails({
      startDate: '',
      endDate: '',
      reason: ''
    });
  };
  const navigate = useNavigate();
  const handleSignupRedirect = () => {
    navigate('/Homepage');
  };


  return (
    <div className='leave-application-container'>
      <h2>Apply for Leave</h2>
      <center>
        <div className='handle'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" value={leaveDetails.startDate} onChange={handleChange} required />
       <br></br>
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" value={leaveDetails.endDate} onChange={handleChange} required />
       <br></br>
        <label htmlFor="reason">Reason:</label>
           <textarea id="reason" name="reason" value={leaveDetails.reason} onChange={handleChange} required />
           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <br></br>
          <button onClick={handleSignupRedirect}>Apply</button>
      </form>
      </div>
      </center>
    </div>
   
  );
}

export default LeaveApplication;