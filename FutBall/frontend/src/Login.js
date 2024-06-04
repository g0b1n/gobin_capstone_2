import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';
import './Login.css';

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok) {
                console.log('User logged in successfully', result);

                // save the token to localstorage
                localStorage.setItem('token', result.token);
                // update the user context 
                setUser(result.user)
                // redirect to the home page
                navigate('/');
            } else {
                console.error('Error logging in user', result);
            }
        } catch (error) {
            console.error('Error logging in user', error);
        };
    }

    const handleClick = async (e) => {
        navigate('/')
    }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;
