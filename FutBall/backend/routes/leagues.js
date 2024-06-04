const express = require('express');
const router = express.Router();
const axios = require('axios');
const { RAPIDAPI_KEY, RAPIDAPI_BASE_URL, RAPIDAPI_HOST } = require('../config');
const ExpressError = require('../helpers/expressError');

// route to fetch leagues
router.get('/', async (req, res, next) => {
    // axios request to api
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/leagues`,
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

// route to fetch leagueDetails
router.get('/:leagueId', async (req, res, next) => {
    const { leagueId } = req.params;
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/leagues`,
        params: { 
            id: leagueId,
            current: 'true'
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

// route to get standings 
router.get('/:leagueId/standings', async (req, res, next) => {
    const { leagueId } = req.params;
    const options = {
        method: 'GET',
        url: `${RAPIDAPI_BASE_URL}/standings`,
        params: { 
            league: leagueId,
            season: 2023
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
})

module.exports = router;