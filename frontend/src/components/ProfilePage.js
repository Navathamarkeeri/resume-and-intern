import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const API_BASE = process.env.REACT_APP_API_URL || "https://intern-backend-yfxc.onrender.com";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const token = localStorage.getItem('token');

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile:', data.message);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!profileData) return <p>Loading profile...</p>;

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.fullName,
      profileData.email,
      profileData.phone,
      profileData.location,
      profileData.degree,
      profileData.college,
      profileData.graduationYear,
      profileData.specialization,
      profileData.skills.length > 0,
      profileData.experience.length > 0,
      profileData.projects.length > 0,
      profileData.resumeFileName
    ];
    const completedFields = fields.filter(field => field && field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const res = await fetch(`${API_BASE}/api/profile/upload-resume`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          setProfileData(prev => ({
            ...prev,
            resumeFileName: data.fileName,
          }));
        } else {
          alert(data.message || 'Resume upload failed');
        }
      } catch (err) {
        console.error('Resume upload error:', err);
        alert('Something went wrong while uploading the resume.');
      }
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const res = await fetch(`${API_BASE}/api/profile/update`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to update profile');
      } else {
        console.log('Profile updated successfully:', data);
      }
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>

        {/* Header & Actions */}
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>

        {/* Profile Strength */}
        <div className="profile-strength-section">
          <h3>Profile Strength: {profileCompletion}% Complete</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${profileCompletion}%` }}></div>
          </div>
        </div>

        {/* Basic Info, Education, Skills, Experience, Projects, Resume */}
        {/* You can reuse the JSX you already have here, just replace inputs with profileData and enable/disable based on isEditing */}
        {/* For brevity, not repeating all JSX; it can be integrated with handleInputChange, addSkill, removeSkill, handleResumeUpload */}

      </div>
    </div>
  );
};

export default ProfilePage;

