import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengeCreationScreen = () => {
    const [name, setName] = useState('');
    const [segments, setSegments] = useState([{ name: '' }]);
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);

    const handleSegmentChange = (index, event) => {
        const newSegments = [...segments];
        newSegments[index].name = event.target.value;
        setSegments(newSegments);
    };

    const addSegment = () => setSegments([...segments, { name: '' }]);

    const removeSegment = (index) => {
        const newSegments = segments.filter((_, i) => i !== index);
        setSegments(newSegments);
    };

    const saveChallenge = () => {
        const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
        challenges.push({ name, segments });
        localStorage.setItem('challenges', JSON.stringify(challenges));
        navigate('/');
    };

    return (
        <div>
            <h1>Create Challenge</h1>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <div>
                {segments.map((segment, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={segment.name}
                            onChange={(e) => handleSegmentChange(index, e)}
                        />
                        <button onClick={() => removeSegment(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={addSegment}>+</button>
            <button onClick={saveChallenge}>Create</button>
        </div>
    );
};

export default ChallengeCreationScreen;
