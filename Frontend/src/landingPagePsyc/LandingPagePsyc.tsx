import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './LandingPagePsyc.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const PsychologistLanding: React.FC = () => {
  const [posts] = useState<Post[]>([
    { id: 1, title: "New Regulation", content: "Please update your profile details.", author: "Admin" },
    { id: 2, title: "Maintenance", content: "The portal will be down this Sunday.", author: "Admin" }
  ]);

  return (
    <div className="landing-page">
      <Navbar userName="Dr. Chiorean"/>
      
      <main className="content">
        <div className="welcome-section">
          <h1 className="greeting">Hi, psychologist!</h1>
          <p className="sub-greeting">See below what's new.</p>
        </div>

        <h2>Admin Announcements</h2>
        <div className="post-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Posted by: {post.author}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PsychologistLanding;