import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './LeagueTable.css';
import config from '../config';

function LeagueTable() {

    const [table, setTable] = useState(null);
    const { leagueId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTable = async () => {
            try {
                // const response = await fetch(`http://localhost:5000/leagues/${leagueId}/standings`);
                const response = await fetch(`${config.API_BASE_URL}/leagues/${leagueId}/standings`);
                const data = await response.json();
                console.log(data);

                if (data && data.response && data.response.length > 0) {
                    const standings = data.response[0].league.standings[0];
                    setTable(standings);
                } else {
                    setError('No League Table Found!')
                }
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching league table', err);
                setError('Error fetching league table');
                setIsLoading(false);
            }
        };
        fetchTable()
    }, [leagueId]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        <p>{error}</p>
    }

    const handleClick = (teamId) => {
        navigate(`/team/${teamId}/fixtures`);
    }

  return (
    <div className="league-table-container">
            <h4>Standings</h4>
            <div>
                {table && table.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Team/Club</th>
                                <th>Games Played</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                                <th>GD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((team) => (
                                <tr key={team.rank} onClick={() => handleClick(team.team.id)}>
                                    <td>{team.rank}</td>
                                    <td className='team-name'>{team.team.name}</td>
                                    <td>{team.all.played}</td>
                                    <td>{team.all.win}</td>
                                    <td>{team.all.draw}</td>
                                    <td>{team.all.lose}</td>
                                    <td className='game-points'>{team.points}</td>
                                    <td>{team.goalsDiff}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>League Table Not Found :(</p>
                )}
            </div>
        </div>
  )
}

export default LeagueTable;
