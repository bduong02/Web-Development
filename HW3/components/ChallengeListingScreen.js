// Bryan Duong
// ChallengeListingScreen.js
// Program used to manage the challenge listing screen.
// 5/19/24

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChallengeListingScreen = () => {
    const [challenges, setChallenges] = useState([]);
    const [bestTimes, setBestTimes] = useState({});

    useEffect(() => {
        const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
        const storedBestTimes = JSON.parse(localStorage.getItem('bestTimes')) || {};
        setChallenges(storedChallenges);
        setBestTimes(storedBestTimes);
    }, []);

    return (
        <div>
            <h1>Challenges</h1>
            <ul>
                {challenges.map((challenge, index) => {
                    const bestTime = bestTimes[index];
                    return (
                        <li key={index}>
                            <div>
                                <span>{challenge.name}</span>
                                <Link to={`/record/${index}`}>
                                    <button>Go to Challenge</button>
                                </Link>
                            </div>
                            {bestTime && (
                                <div>
                                    <p>Best Overall Time: {new Date(bestTime.overallTime * 1000).toISOString().substr(11, 8)}</p>
                                    <ul>
                                        {challenge.segments.map((segment, segIndex) => (
                                            <li key={segIndex}>
                                                {segment.name}: {bestTime.segmentTimes[segIndex] !== null ? new Date(bestTime.segmentTimes[segIndex] * 1000).toISOString().substr(11, 8) : '--:--:--'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <Link to="/create"><button>+</button></Link>
        </div>
    );
};

export default ChallengeListingScreen;
