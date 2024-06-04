const express = require('express');
const router = express.Router();
const axios = require('axios');
const { RAPIDAPI_KEY, RAPIDAPI_BASE_URL, RAPIDAPI_HOST } = require('../config');
const ExpressError = require('../helpers/expressError');


// route to fetch matches by date
router.get('/', async (req, res, next) => {
    const { date } = req.query;

    // initial page load or if date is not provided
    const dateToFetch = date || new Date().toISOString().split('T')[0];

    // axios request to api
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/fixtures`,
        params: { 
            date: dateToFetch
        },
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
        }
    };

    try {
        // make the request to api
        const response = await axios.request(options);
        // send the fetched data as the response
        res.json(response.data);
    } catch (error) {
        // log the error and pass to error handler
        console.error(error);
        next(new ExpressError('Failed to fetch matches data', 500));
    }
});


// route to fetch matchDetails
router.get('/:matchId', async (req, res, next) => {
    const { matchId } = req.params;
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/fixtures`,
        params: { id: matchId },
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
        }
    };

    try {
        // make the request to api
        const response = await axios.request(options);
        // send the fetched data as response
        res.json(response.data);
    } catch (err) {
        console.error(err);
        next(new ExpressError('Failed to fetch matches data', 500));
    }
});

router.get('/:teamId/fixtures', async (req, res, next) => {
    const { teamId } = req.params;
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/fixtures`,
        params: {
            team: teamId,
            season: "2023"
        },
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
        }
    };

    try {
        // make the request to api
        const response = await axios.request(options);
        // send the fetched data as response
        res.json(response.data);
    } catch (err) {
        console.error(err);
        next(new ExpressError('Failed to fetch matches data', 500));
    }
})


module.exports = router;