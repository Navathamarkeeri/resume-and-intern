import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

// IconButton Component for cleaner SVG buttons
const IconButton = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL || "https://intern-backend-yfxc.onrender.com";

  const [activeTab, setActiveTab] = useState('Browse Jobs');
  const [searchQuery, setSearchQuery] = useState('Search Data Science internships in Bangalore');
  const [locationFilter, setLocationFilter] = useState('Location');
  const [internshipType, setInternshipType] = useState([]);
  const [stipendRange, setStipendRange] = useState([0, 20000]);
  const [duration, setDuration] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const userEmail = location.state?.userEmail || 'user@example.com';
  const userData = {
    username: userEmail.split('@')[0],
    email: userEmail,
    avatar: userEmail.charAt(0).toUpperCase()
  };

  // Fetch internships from backend
  const [internships, setInternships] = useState([]);
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(`${API_URL}/internships`);
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };
    fetchInternships();
  }, [API_URL]);

  // Notifications (optional: fetch from backend if available)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New internship match", message: "Google Data Science internship matches your profile", time: "2 hours ago", type: "match", isRead: false },
    { id: 2, title: "Application update", message: "Your application to Microsoft has been reviewed", time: "1 day ago", type: "application", isRead: false },
    { id: 3, title: "Profile completion", message: "Complete your profile to get better matches", time: "3 days ago", type: "profile", isRead: true }
  ]);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  // Save/unsave internship (calls backend)
  const toggleSave = async (id) => {
    try {
      const response = await fetch(`${API_URL}/internships/${id}/toggle-save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail })
      });
      const data = await response.json();
      setInternships(prev => prev.map(job => job.id === id ? { ...job, isSaved: data.isSaved } : job));
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const handleInternshipTypeChange = (type) =>
    setInternshipType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const applyFilters = () => console.log('Applying filters:', { locationFilter, internshipType, stipendRange, duration });
  const clearFilters = () => { setLocationFilter('Location'); setInternshipType([]); setStipendRange([0, 20000]); setDuration(''); };
  const handleSearch = () => console.log('Searching for:', searchQuery, locationFilter);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left"><h1 className="app-logo">InternshipAI</h1></div>
        <nav className="header-nav">
          <button className="nav-link active" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="nav-link" onClick={() => navigate('/profile')}>Profile</button>
        </nav>
        <div className="header-actions">
          <div className="user-profile">
            <div className="notification-wrapper">
              <IconButton className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                Notifications {notifications.filter(n => !n.isRead).length > 0 && <span className="notification-dot"></span>}
              </IconButton>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <span>{notifications.filter(n => !n.isRead).length} new</span>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notification-item ${!n.isRead ? 'unread' : ''}`} onClick={() => markAsRead(n.id)}>
                        <h4>{n.title}</h4>
                        <p>{n.message}</p>
                        <span>{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button onClick={markAllAsRead}>Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <span className="user-avatar">{userData.avatar}</span>
              <div className="user-details"><span>{userData.email}</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {userData.username}!</h2>
        </div>

        {/* Search */}
        <div className="search-section">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option>Location</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Hyderabad</option>
            <option>Remote</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Internships */}
        <div className="internships-list">
          {internships.map(job => (
            <div key={job.id} className="internship-card">
              <h4>{job.title} ({job.company})</h4>
              <p>{job.description}</p>
              <button onClick={() => toggleSave(job.id)}>{job.isSaved ? 'Unsave' : 'Save'}</button>
              <button>Apply Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
