const express = require('express');
const cors = require('cors');
const app = express();
const ExpressError = require('./helpers/expressError');

// allowed origins for cors 
const allowedOrigins = [
  'https://capstone-2-futball-frontend-6c1740fe1d19.herokuapp.com'
];

app.use(cors({
    origin: function (origin, callBack) {
        // allow requests with no orign like mobile apps or curl 
        if (!origin) return callBack(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callBack(new ExpressError(msg), false);
        };
        return callBack(null, true);
    },
    // expose cookies/auth headers for frontend
    credentials: true
}));
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