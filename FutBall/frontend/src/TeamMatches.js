import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './TeamMatches.css';
import config from "../config";

function TeamMatches() {

    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    const { teamId } = useParams();

    useEffect(() => {
        // fetch matches data from backend
        const fetchTeamMatches = async () => {
            try {
                // make get request
                const response = await fetch(`${config.API_BASE_URL}/matches/${teamId}/fixtures`);
                // parse response as json
                const data = await response.json()
                console.log(data);
                setMatches(data.response);
            } catch (err) {
                console.error('Error fetching matches:', err);
            }
        }
        if (teamId) {
            fetchTeamMatches()
        }
        
    }, [teamId]);

    const formatTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleTimeString().toLowerCase();;
  };

  return (
    <div className="team-matches-container">
            <ul className="team-matches-list">
                {matches.map((match) => (
                    <li key={match.fixture.id} onClick={() => navigate(`/matches/${match.fixture.id}`)} className="team-match-item">
                        <p className="team-matches-league-name">{match.league.name} - {match.league.country}</p>
                        <div className="team-match-details">
                            <span className="team-name">{match.teams.home.name}</span>
                            <span className="match-score">
                                {match.fixture.status && match.fixture.status.short === 'FT' ? (
                                    `${match.goals.home} - ${match.goals.away}`
                                ) : (
                                    formatTime(match.fixture.date)
                                )}
                            </span>
                            <span className="team-name">{match.teams.away.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default TeamMatches;
