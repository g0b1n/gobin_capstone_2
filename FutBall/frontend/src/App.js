import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import NavBar from './NavBar';
import Home from './Home';
import Matches from './Matches';
import MatchDetails from './MatchDetails';
import Competitions from './Competitions';
import LeagueDetails from './LeagueDetails';
import AllTeamMatches from './AllTeamMatches';
import Login from './Login';
import Register from './Register';
import Users from './Users';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/matches/:matchId' element={<MatchDetails />} />
          <Route path='/leagues' element={<Competitions />} />
          <Route path='/leagues/:leagueId' element={<LeagueDetails />} />
          <Route path='/team/:teamId/fixtures' element={<AllTeamMatches />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
