import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

 function Signup(){
  const [formData, setFormData] = useState({
    firstName: '',
   
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleSignupRedirect = () => {
    navigate('/Login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
   
   
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>&nbsp;&nbsp;&nbsp;
        <input type="text" name="firstName" placeholder="Name" value={formData.firstName} onChange={handleChange} />
        
        <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
       
        <label>Password</label>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
    
        <center><button onClick={handleSignupRedirect}>Sign Up</button></center>
      </form>
    </div>
  );
}

export default Signup;