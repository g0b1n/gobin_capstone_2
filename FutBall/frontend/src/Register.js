import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css';
import config from './config';

function Register() {

    const navigate = useNavigate();

    // define state to hold form data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            // update the corresponting fields
            [name]: value
        }))
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    // set content type to JSON
                    'Content-Type': 'application/json'
                },
                // send form data as JSON
                body: JSON.stringify(formData),
            });
            // parse json response
            const result = await response.json();
            if (response.ok) {
                console.log('User registered successfully', result);
                // redirect to the home page
                navigate('/');
            } else {
                console.error('Error registering user', result);
            }
        } catch (error) {
            console.error('Error registering user', error);
        };
    }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Phone:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
        </form>
  )
}

export default Register;
