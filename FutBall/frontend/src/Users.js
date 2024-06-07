import React, { useState, useEffect } from 'react';
import config from './config';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${config.API_BASE_URL}/users`);
        const data = await response.json();
        if (response.ok) {
          if (Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            console.error('Expected an array of users');
            setError('Data format is incorrect.');
          }
        } else {
          throw new Error('Failed to load data');
        }
      } catch (error) {
        console.error('Error fetching users', error);
        setError('Error fetching users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
