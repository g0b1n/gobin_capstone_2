import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MatchDetails.css';

function MatchDetails() {

    const [matchDetails, setMatchDetails] = useState(null);
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetch matche details from backend
        const fetchMatchDetails = async () => {
            try {
                // make get request
                const response = await fetch(`http://localhost:5000/matches/${matchId}`);
                const data = await response.json();
                console.log(data);
                setMatchDetails(data.response[0]);
                setIsLoading(false)
            } catch (err) {
                console.error('Error fetching match details:', err);
                setError('Error fetching match details');
                setIsLoading(false)
            }
        };
        fetchMatchDetails()
    }, [matchId])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        <p>{error}</p>
    }

    const formatTime = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleTimeString().toLowerCase();
    };

    const formatDate = (utcDate) => {
        const date = new Date(utcDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

  return (
    <div className="match-details-container">
      {matchDetails && (
        <>
        <div className="match-details-header">
            <span>{matchDetails.teams.home.name} </span>
            <span>
                {matchDetails.fixture.status && matchDetails.fixture.status.short === 'FT' ? (
                    `${matchDetails.goals.home} - ${matchDetails.goals.away}`
                ) : (
                    formatTime(matchDetails.fixture.date)
                )}
            </span>
            <span> {matchDetails.teams.away.name}</span>
         </div>
         <div className="match-details-info">
            <p>Date: {formatDate(matchDetails.fixture.date)} </p>
            <p>Venue: {matchDetails.fixture.venue.name}, {matchDetails.fixture.venue.city}</p>
            <p>Referee: {matchDetails.fixture.referee || 'N/A'}</p>
         </div>

         {matchDetails.lineups && matchDetails.lineups[0] && (
                        <div className="lineup-section">
                            <h4>
                                {matchDetails.teams.home.name}'s Lineup (
                                {matchDetails.lineups[0].formation || 'N/A'})
                            </h4>
                            {matchDetails.lineups[0].startXI && matchDetails.lineups[0].startXI.map((player) => (
                                <p key={player.player.id}>
                                    <span>{player.player?.number || '00'}. </span>{player.player.name}
                                </p>
                            ))}
                            <h4>Substitutes</h4>
                            {matchDetails.lineups[0].substitutes && matchDetails.lineups[0].substitutes.map((subs) => (
                                <p key={subs.player.id}>
                                    <span>{subs.player?.number || '00'}. </span>{subs.player.name}
                                </p>
                            ))}
                        </div>
                    )}
         {matchDetails.lineups && matchDetails.lineups[1] && (
                        <div className="lineup-section">
                            <h4>
                                {matchDetails.teams.away.name}'s Lineup (
                                {matchDetails.lineups[1].formation || 'N/A'})
                            </h4>
                            {matchDetails.lineups[1].startXI && matchDetails.lineups[1].startXI.map((player) => (
                                <p key={player.player.id}>
                                    <span>{player.player?.number || '00'}. </span>{player.player.name}
                                </p>
                            ))}
                            <h4>Substitutes</h4>
                            {matchDetails.lineups[1].substitutes && matchDetails.lineups[1].substitutes.map((subs) => (
                                <p key={subs.player.id}>
                                    <span>{subs.player?.number || '00'}. </span>{subs.player.name}
                                </p>
                            ))}
                        </div>
                    )}
        </>
      )}
    </div>
  )
}

export default MatchDetails;
