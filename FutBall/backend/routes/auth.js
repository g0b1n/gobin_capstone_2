const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');

// User registration route
router.post('/register', async (req, res, next) => {
  try {
    // Get user details from the request body
    const { username, password, first_name, last_name, email, phone } = req.body;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // Insert the new user into the database
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING username, first_name, last_name, email, phone`,
      [username, hashedPassword, first_name, last_name, email, phone]
    );

    // Get the newly created user
    const user = result.rows[0];

    // Send back the user details as a JSON response
    return res.status(201).json({ user });
  } catch (err) {
    // Handle duplicate username or email error
    if (err.code === '23505') {
      return next(new ExpressError('Username or email already exist', 400));
    }

    // Handle any other errors
    return next(err);
  }
});

// User login route
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user in the database
    const result = await db.query(
      'SELECT username, password FROM users WHERE username = $1', [username]
    );

    const user = result.rows[0];

    if (user) {
      // Compare hashed password with the one in the database
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // Generate a JWT token
        const token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
      }
    }

    throw new ExpressError('Invalid username or password', 400);
  } catch (err) {
    return next(err);
  }
});

// Endpoint to get current user data based on token
router.get('/me', async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Split the Bearer prefix from the token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    // Verify the token
    const payload = jwt.verify(token, SECRET_KEY);

    // Query the database for the user
    const result = await db.query('SELECT * FROM users WHERE username = $1', [payload.username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
