import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChallengeListingScreen from './components/ChallengeListingScreen';
import ChallengeCreationScreen from './components/ChallengeCreationScreen';
import ChallengeRecordingScreen from './components/ChallengeRecordingScreen';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Challenges</Link>
                    <Link to="/create">Create Challenge</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<ChallengeListingScreen />} />
                    <Route path="/create" element={<ChallengeCreationScreen />} />
                    <Route path="/record/:id" element={<ChallengeRecordingScreen />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
