import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import logo from '../assets/PsycareLogo.png'
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login payload:', { email, password });
  };

  useEffect(() =>{
    document.title = "Login - Psycare";
  },[])

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Logo Section */}
        <div className="logo-area">
          {/* Change src to your actual logo URL */}
          <img 
            src={logo} 
            alt="PsyCare App Icon" 
            className="logo-placeholder" 
          />
          <h1 className="app-name">PsyCare</h1>
          <span className="app-tagline">Portal for Psychologists & Patients</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* Email / Username */}
          <div className="input-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="input-field"
              placeholder="e.g. doctor@psycare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <div className="password-header">
              <label htmlFor="password" className="label">
                Password
              </label>
              <button type="button" className="link">
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-area"> 
            <div className="register-text">Want to sign-up as a user?  </div>
            <button type="button" className="link" onClick={() => {navigate("/register")}}>
              Click Here!
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Log In
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;