import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./config";
import './Leagues.css';


function Leagues() {

    const [leagues, setLeagues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch leagues 
        const fetchLeagues = async () => {
            try {
                // make get request
                // const response = await fetch('http://localhost:5000/leagues')
                const response = await fetch(`${config.API_BASE_URL}/leagues`);
                // parse response as json
                const data = await response.json();
                console.log(data)
                setLeagues(data.response);
            } catch (err) {
                console.error('Error fetching leagues')
            }
        }
        fetchLeagues()
    }, []);

    return (
        <div className="leagues-container">
            <div className="leagues-header">
                <h4>Leagues</h4>
            </div>
            <ul className="leagues-list">
                {leagues.map((league) => (
                    <li key={league.league.id} onClick={() => navigate(`/leagues/${league.league.id}`)}>
                        <p>{league.league.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Leagues;