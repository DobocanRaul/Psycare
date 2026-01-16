import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/PsycareLogo.png';
import profilepic from '../assets/no_profile_pic.png';
import './Navbar.css';

interface NavbarProps {
  userName: string;
  isPatient?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ userName, isPatient }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Brand + Navigation */}
      <div className="navbar-left">
        <div className="navbar-brand" onClick={() => navigate('/home')}>
          <img src={logo} alt="PsyCare Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">PsyCare</span>
        </div>

        {/* 2. Hide this section if isPatient is true */}
        {!isPatient && (
          <div className="nav-navigation">
            <div 
              className="dropdown-wrapper"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="nav-item">Patients</button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <span className="dropdown-item">Popescu Ana</span>
                  <span className="dropdown-item">Marcu Maria</span>
                  <span className="dropdown-item">Pop Dana</span>
                </div>
              )}
            </div>
            <button className="invite-btn" onClick={() => alert('Invite sent!')}>
              Invite Patient
            </button>
          </div>
        )}
      </div>

        {/* RIGHT SIDE: Profile + Logout */}
      <div className="navbar-right">
        <div className="navbar-profile-group">
          <div className="navbar-profile-circle">
            <img 
              src={profilepic} 
              alt="User Profile" 
              className="nav-avatar"
            />
          </div>
          <span className="navbar-user-name">{userName}</span>
        </div>
        
        <button className="logout-btn" onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;