import React from 'react';
import Navbar from '../navbar/Navbar';
import './landingPagePatient.css';

const PatientLanding: React.FC = () => {
  return (
    <div className="landing-page">
      <Navbar userName="Popescu Ana" isPatient={true}/>
      
      <main className="content">
        <div className="welcome-section">
          <h1 className="greeting">Welcome back!</h1>
          <p className="sub-greeting">How are you feeling today?</p>
        </div>

        {/* Action Grid */}
        <div className="patient-actions">
          
          {/* Mood Tracker Card */}
          <div className="action-card mood-card">
            <h3>Mood Tracker</h3>
            <p>Log your emotional state for today.</p>
            <div className="mood-icons">
              <span>😊</span><span>😐</span><span>😔</span><span>😠</span>
            </div>
            <button className="action-btn">Track Mood</button>
          </div>

          {/* Journal Card */}
          <div className="action-card journal-card">
            <h3>Daily Journal</h3>
            <p>Write down your thoughts and reflections.</p>
            <button className="action-btn">New Entry</button>
          </div>

        </div>

        {/* Panic Section */}
        <div className="panic-section">
          <div className="panic-box">
            <p>Need immediate help? If you're feeling overwhelmed, alert your psychologist.</p>
            <button className="panic-button" onClick={() => alert('Psychologist has been notified.')}>
              I need help
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientLanding;