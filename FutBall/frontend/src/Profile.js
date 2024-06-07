import React from 'react'
import { useUser } from './Context/UserContext';
import './Profile.css'

function Profile() {

  const { user, setUser, isLoggedIn } = useUser();

  // check if user exists 
  if (!user) {
    return <div>Loading...</div>;
  };
  
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p className="profile-detail"><b>Username:</b> {user.username}</p>
      <p className="profile-detail"><b>Email:</b> {user.email}</p>
      <p className="profile-detail"><b>Phone:</b> {user.phone}</p>
    </div>
  )
}

export default Profile;
