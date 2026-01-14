import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Requires react-router-dom installed
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="not-found-container">
      
      {/* Background visual element */}
      <h1 className="error-code">404</h1>
      
      <h2 className="error-title">Page Not Found</h2>
      
      <p className="error-message">
        We couldn't find the page you were looking for. 
        It might have been moved or doesn't exist.
      </p>

      {/* Button to redirect user safely */}
      <button onClick={() => {navigate(-1)}}>
        Back to Safety
      </button>
      
    </div>
  );
};

export default NotFoundPage;