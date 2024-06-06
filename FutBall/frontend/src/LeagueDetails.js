import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeagueTable from "./LeagueTable";
import config from '../config';

function LeagueDetails() {
    
    const [leagueDetails, setLeagueDetails] = useState(null);
    const { leagueId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        // fetch league details
        const fetchLeagueDetails = async () => {
            try {
                // make get request
                // const response = await fetch(`http://localhost:5000/leagues/${leagueId}`);
                const response = await fetch(`${config.API_BASE_URL}/leagues/${leagueId}`);
                const data = await response.json();
                console.log(data);
                setLeagueDetails(data.response[0])
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching league details', err);
                setError('Error fetching match details');
                setIsLoading(false);
            }
        };
        fetchLeagueDetails()
    }, [leagueId])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        <p>{error}</p>
    }

    return (
        <div className="league-details-container">
            {leagueDetails && (
                <>
                <div className="league-header">
                    <h3>
                        {leagueDetails.league.name} - {leagueDetails.country.name}
                    </h3>
                </div>

                <div className="season-info">
                    <h4>
                        Season: {leagueDetails.seasons[0].year} - {leagueDetails.seasons[0].year+1}
                    </h4>
                </div>
                <div className="league-table">
                    <LeagueTable />
                </div>
                </>
            )}
        </div>
    )

};

export default LeagueDetails;