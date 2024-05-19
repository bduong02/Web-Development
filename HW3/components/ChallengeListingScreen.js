import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChallengeListingScreen = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
        setChallenges(storedChallenges);
    }, []);

    return (
        <div>
            <h1>Challenges</h1>
            <ul>
                {challenges.map((challenge, index) => (
                    <li key={index}>
                        {challenge.name}
                        <Link to={`/record/${index}`}><button>Go to Challenge</button></Link>
                    </li>
                ))}
            </ul>
            <Link to="/create"><button>+</button></Link>
        </div>
    );
};

export default ChallengeListingScreen;
