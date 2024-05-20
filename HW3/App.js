import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChallengeListingScreen from './components/ChallengeListingScreen';
import ChallengeCreationScreen from './components/ChallengeCreationScreen';
import ChallengeRecordingScreen from './components/ChallengeRecordingScreen';

const App = () => {
    const [challenges, setChallenges] = useState([
        {
            id: 1,
            name: 'Challenge 1',
            segments: [{ name: 'Segment 1' }, { name: 'Segment 2' }],
            bestRun: null // Initially no best run
        },
        // other challenges...
    ]);

    const updateBestRun = (challengeId, bestRun) => {
        setChallenges(prevChallenges => prevChallenges.map(challenge =>
            challenge.id === challengeId ? { ...challenge, bestRun } : challenge
        ));
    };

    const addChallenge = (newChallenge) => {
        setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
    };

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Challenges</Link>
                    <Link to="/create">Create Challenge</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<ChallengeListingScreen challenges={challenges} />} />
                    <Route path="/create" element={<ChallengeCreationScreen addChallenge={addChallenge} />} />
                    <Route path="/record/:id" element={<ChallengeRecordingScreen challenges={challenges} updateBestRun={updateBestRun} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
