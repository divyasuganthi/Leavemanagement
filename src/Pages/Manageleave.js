import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Manageleave.css';

const Manageleave = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, startDate: '2024-06-01', endDate: '2024-06-05', reason: 'Vacation' },
    { id: 2, startDate: '2024-06-10', endDate: '2024-06-15', reason: 'Medical Leave' },
    { id: 3, startDate: '2024-06-19', endDate: '2024-06-22', reason: 'sick' },
    
  ]);

  const navigate = useNavigate(); 

  
  const handleEdit = (id) => {
    
    navigate(`/edit-leave/${id}`);
  };

  const handleDelete = (id) => {
    const updatedLeaveRequests = leaveRequests.filter(request => request.id !== id);
    
    setLeaveRequests(updatedLeaveRequests);
  };

  return (
    <div className="manage-leave-container">
      <h2>Manage Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(request.id)}>Approved</button>
                <button className="delete-button" onClick={() => handleDelete(request.id)}>Rejected</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manageleave;
