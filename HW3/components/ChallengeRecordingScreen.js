import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChallengeRecordingScreen = () => {
    const { id } = useParams();
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const challenge = challenges[id];
    const [timer, setTimer] = useState(0);
    const [segmentTimes, setSegmentTimes] = useState(Array(challenge.segments.length).fill(null));
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let interval;
        if (running && !paused) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running, paused]);

    const handleStart = () => setRunning(true);
    const handlePause = () => setPaused(!paused);
    const handleNextSegment = () => {
        const nextIndex = segmentTimes.findIndex(time => time === null);
        if (nextIndex !== -1) {
            const newSegmentTimes = [...segmentTimes];
            newSegmentTimes[nextIndex] = timer;
            setSegmentTimes(newSegmentTimes);
        }
    };
    const handleEnd = () => setRunning(false);

    return (
        <div>
            <h1>{challenge.name}</h1>
            <div>Timer: {new Date(timer * 1000).toISOString().substr(11, 8)}</div>
            <ul>
                {challenge.segments.map((segment, index) => (
                    <li key={index}>
                        {segment.name}: {segmentTimes[index] !== null ? new Date(segmentTimes[index] * 1000).toISOString().substr(11, 8) : '--:--:--'}
                    </li>
                ))}
            </ul>
            {!running && <button onClick={handleStart}>Start</button>}
            {running && (
                <>
                    <button onClick={handleNextSegment}>Next Segment</button>
                    <button onClick={handleEnd}>End</button>
                    <button onClick={handlePause}>{paused ? 'Resume' : 'Pause'}</button>
                </>
            )}
        </div>
    );
};

export default ChallengeRecordingScreen;
