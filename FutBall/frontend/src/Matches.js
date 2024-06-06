import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import DatePicker from "./DatePicker";
import './Matches.css';


function Matches() {
    const [matchesByDate, setMatchesByDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const navigate = useNavigate();

    useEffect(() => {
        // fetch matches data from backend
        const fetchMatches = async (date) => {
            try {
                // make get request
                // const response = await fetch(`http://localhost:5000/matches?date=${date}`);
                const response = await fetch(`${config.API_BASE_URL}/matches?date=${date}`);
                // parse response as json
                const data = await response.json()
                console.log(data);
                setMatchesByDate(data.response);
            } catch (err) {
                console.error('Error fetching matches:', err);
            }
        }
        fetchMatches(selectedDate)
    }, [selectedDate]);

    const formatTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleTimeString().toLowerCase();;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  }

    return (
        <div className="matches-container">
            <h1>Today's Matches</h1>
            <input 
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-picker"
            />
            <ul className="matches-list">
                {matchesByDate.map((match) => (
                    <li key={match.fixture.id} onClick={() => navigate(`/matches/${match.fixture.id}`)} className="match-item">
                        <p className="matches-league-name">{match.league.name} - {match.league.country}</p>
                        <div className="match-details">
                            <span className="team-name">{match.teams.home.name} </span>
                            <span className="match-score">
                                {match.fixture.status && match.fixture.status.short === 'FT' ? (
                                    `${match.goals.home} - ${match.goals.away}`
                                ) : (
                                    formatTime(match.fixture.date)
                                )}
                            </span>
                            <span className="team-name">  {match.teams.away.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Matches;