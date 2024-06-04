const express = require('express');
const cors = require('cors');
const app = express();
const ExpressError = require('./helpers/expressError');

app.use(cors());
app.use(express.json());

// import routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matches');
const leagueRoutes = require('./routes/leagues')

// define routes
app.use("/users", userRoutes);
app.use('/auth', authRoutes);
app.use("/matches", matchRoutes);
app.use('/leagues', leagueRoutes);


// 404 error handler
app.use(function (req, res) {
    return new ExpressError("Page Not Found", 404);
});

// generic error handler
app.use(function (err, req, res, next) {
    // default status is 500 internal server error
    res.status(err.status || 500);

    // set the status and alert the user
    return res.json({
            message: err.message,
            status: err.status
    });
});

module.exports = app;