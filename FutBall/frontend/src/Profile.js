import React from 'react'
import { useUser } from './Context/UserContext';

function Profile() {

  const { user, setUser, isLoggedIn } = useUser();

  // check if user exists 
  if (!user) {
    return <div>Loading...</div>;
  };
  
  return (
    <div>
      <p>{user.username} Profile</p>
    </div>
  )
}

export default Profile;
