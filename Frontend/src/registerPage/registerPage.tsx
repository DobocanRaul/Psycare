import React, { useEffect, useState } from 'react';
import './RegisterPage.css';
import logo from '../assets/PsycareLogo.png';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    dateOfBirth: '', // Changed from age
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  useEffect(() =>{
      document.title = "Register - Psycare";
    },[])

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log('Registering User:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        
        <div className="register-header">
          <img src={logo} alt="PsyCare Logo" className="register-logo" />
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join PsyCare as a professional or patient</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          
          {/* Row 1: Name & Surname */}
          <div className="form-row">
            <div className="input-group">
              <label className="label">First Name</label>
              <input
                name="name"
                type="text"
                className="input-field"
                placeholder="John"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="label">Last Name</label>
              <input
                name="surname"
                type="text"
                className="input-field"
                placeholder="Doe"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="input-group">
            <label className="label">Email Address</label>
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="label">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="input-field"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label className="label">Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date" 
                className="input-field"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max="9999-10-31"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Medical License Number</label>
            <input
              name="licenseNumber"
              type="text"
              className="input-field"
              placeholder="e.g. PSY-12345678"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 5: Passwords */}
          <div className="form-row">
            <div className="input-group">
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className={`input-field ${error ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="label">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className={`input-field ${error ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>

        <p className="login-link-text">
          Already have an account? <button className="link" onClick={() => {navigate("/login")}}>Log In</button>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;