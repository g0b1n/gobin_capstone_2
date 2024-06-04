const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get all users
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT username, first_name, last_name, email, phone FROM users');
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;