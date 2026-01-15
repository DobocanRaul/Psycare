import React, { useState, useRef } from 'react';
import './AdminPage.css';
import { Navigate, useNavigate } from 'react-router-dom';

// ... (Keep your interfaces for PsychologistRequest and Post here) ...
interface PsychologistRequest {
  id: number;
  name: string;
  email: string;
  licenseNumber: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'posts'>('requests');
  const [maxId,setMaxId] = useState<number>(103);
  const navigation = useNavigate();
  // --- Requests Logic (Keep as is) ---
  const [requests, setRequests] = useState<PsychologistRequest[]>([
    { id: 1, name: "Dr. Sarah Miller", email: "sarah.m@example.com", licenseNumber: "PSY-883920", date: "2024-01-10" },
    { id: 2, name: "Dr. James Carter", email: "j.carter@example.com", licenseNumber: "PSY-112233", date: "2024-01-12" },
    { id: 3, name: "Dr. Emily Wong", email: "emily.w@example.com", licenseNumber: "PSY-998877", date: "2024-01-14" },
  ]);

  const handleAction = (id: number, action: 'approve' | 'deny') => {
    setRequests(requests.filter(req => req.id !== id));
    alert(`Request ${action}d successfully`);
  };

  const [postData, setPostData] = useState({ title: '', content: '' });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file input click again
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publishing:", { ...postData, image: previewUrl });
    alert("Post published!");
    
    setPostData({ title: '', content: '' });
    setPreviewUrl(null);

    const newPost = {id:maxId, title:postData.title, excerpt:postData.content, imageUrl:previewUrl} as Post
    setMaxId(maxId+1)
    setExistingPost([...existingPosts,newPost].sort((a,b) => b.id - a.id))
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [existingPosts,setExistingPost] = useState<Post[]> ([
    { id: 101, title: "Understanding Anxiety Triggers", excerpt: "Learn how to identify the root causes of daily anxiety...", imageUrl: "https://via.placeholder.com/80/EFF6FF/3B82F6?text=Anxiety" },
    { id: 102, title: "The Benefits of Mindfulness", excerpt: "Mindfulness is more than just a buzzword...", imageUrl: "https://via.placeholder.com/80/ECFDF5/10B981?text=Mindful" },
  ]);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div>
        <div className="sidebar-title">🛡️ Admin Panel</div>
        <div className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
          Pending Requests
        </div>
        <div className={`nav-item ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
          Manage Content
        </div>
        </div>
        <button className='publish-btn' onClick={() => {navigation("/login")}}>Logout</button>
      </div>

      <div className="admin-content">
        
        {activeTab === 'requests' && (
          <div>
            <h2 className="section-title">Psychologist Verification Requests</h2>
            <table className="requests-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>License No.</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.name}</td><td>{req.email}</td><td>{req.licenseNumber}</td><td>{req.date}</td>
                    <td>
                      <button className="action-btn btn-approve" onClick={() => handleAction(req.id, 'approve')}>Approve</button>
                      <button className="action-btn btn-deny" onClick={() => handleAction(req.id, 'deny')}>Deny</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <h2 className="section-title">Content Management</h2>
            <div className="posts-split-view">
              
              <div className="post-form-section">
                <div className="post-form-card">
                  <form onSubmit={handlePostSubmit}>
                    <div className="form-group">
                      <label className="form-label">Article Title</label>
                      <input type="text" className="form-input" placeholder="Title" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cover Image</label>
                      
                      <div className="file-upload-wrapper" onClick={handleFileClick}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={fileInputRef}
                          className="hidden-file-input"
                          onChange={handleFileChange}
                        />
                        
                        {previewUrl ? (
                          <div className="preview-container">
                            <img src={previewUrl} alt="Preview" className="preview-image" />
                            <br/>
                            <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <>
                            <span style={{fontSize: '24px'}}>☁️</span>
                            <p className="upload-placeholder-text">Click here to upload cover image</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Content</label>
                      <textarea className="form-textarea" placeholder="Write article..." value={postData.content} onChange={(e) => setPostData({...postData, content: e.target.value})} required />
                    </div>

                    <button type="submit" className="publish-btn">Publish Post</button>
                  </form>
                </div>
              </div>

              <div className="posts-feed-section">
                <h3 className="feed-title">Recent Posts</h3>
                {existingPosts.map(post => (
                  <div className="feed-card" key={post.id}>
                    <img src={post.imageUrl} alt={post.title} className="feed-image-placeholder" />
                    <div className="feed-content">
                      <h4 className="feed-post-title">{post.title}</h4>
                      <p className="feed-post-excerpt">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;