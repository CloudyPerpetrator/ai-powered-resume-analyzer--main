import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './RegisterJobseeker.css';

function RegisterJobseeker({ setUserName }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('job_seeker');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role, // Role is hardcoded for Job Seeker registration
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the username for the session
        setUserName(username);
        alert('Registered Successfully.');
        // Navigate to the upload page after successful registration
        navigate('/');
      } else {
        alert(data.error || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleRoleChangeToRecruiter = () => {
    setRole('recruiter'); // Change role to 'recruiter'
  };

  return (
    <div className="register-form">
      <h2>Register as {role === 'job_seeker' ? 'Job Seeker' : 'Recruiter'}</h2>
      <form onSubmit={handleSubmit}>
      <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register as {role === 'job_seeker' ? 'Job Seeker' : 'Recruiter'}</button>
      </form>
      <button
        className="switch-btn"
        onClick={handleRoleChangeToRecruiter}
      >
        Switch to Recruiter
      </button>
    </div>
  );
}

export default RegisterJobseeker;
