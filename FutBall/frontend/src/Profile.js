import React from 'react'
import { useUser } from './Context/UserContext';

function Profile() {

  const { user, setUser, isLoggedIn } = useUser();
  
  return (
    <div>
      <p>{user.username} Profile</p>
    </div>
  )
}

export default Profile;
