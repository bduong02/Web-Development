// Bryan Duong
// ChallengeRecordingScreen.js
// Program used to manage the challenge recording screen.
// 5/19/24

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChallengeRecordingScreen = () => {
    const { id } = useParams();
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const bestTimes = JSON.parse(localStorage.getItem('bestTimes')) || {};
    const challenge = challenges[id];

    if (!challenge) {
        return <div>Challenge not found</div>;
    }

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

    const handleStart = () => {
        setRunning(true);
        setPaused(false);
    };

    const handlePause = () => setPaused(prev => !prev);

    const handleNextSegment = () => {
        const nextIndex = segmentTimes.findIndex(time => time === null);
        if (nextIndex !== -1) {
            const newSegmentTimes = [...segmentTimes];
            newSegmentTimes[nextIndex] = timer;
            setSegmentTimes(newSegmentTimes);
        }
    };

    const handleEnd = () => {
        setRunning(false);
        setPaused(false);

        const currentRunTime = timer;
        const bestRun = bestTimes[id] || { overallTime: Infinity, segmentTimes: Array(challenge.segments.length).fill(Infinity) };

        if (currentRunTime < bestRun.overallTime) {
            bestTimes[id] = { overallTime: currentRunTime, segmentTimes };
            localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
        }
    };

    const getSegmentColor = (index) => {
        if (!segmentTimes[index]) return 'black';
        const bestSegmentTime = bestTimes[id]?.segmentTimes[index] ?? Infinity;
        if (segmentTimes[index] < bestSegmentTime) return 'green';
        if (segmentTimes[index] === bestSegmentTime) return 'yellow';
        return 'red';
    };

    return (
        <div>
            <h1>{challenge.name}</h1>
            <div>Timer: {new Date(timer * 1000).toISOString().substr(11, 8)}</div>
            <ul>
                {challenge.segments.map((segment, index) => (
                    <li key={index} style={{ color: getSegmentColor(index) }}>
                        {segment.name}: {segmentTimes[index] !== null ? new Date(segmentTimes[index] * 1000).toISOString().substr(11, 8) : '--:--:--'}
                    </li>
                ))}
            </ul>
            {!running ? (
                <button onClick={handleStart}>Start</button>
            ) : (
                <>
                    <button onClick={handleNextSegment} disabled={paused || segmentTimes[segmentTimes.length - 1] !== null}>
                        Next Segment
                    </button>
                    <button onClick={handleEnd}>End</button>
                    <button onClick={handlePause}>{paused ? 'Resume' : 'Pause'}</button>
                </>
            )}
        </div>
    );
};

export default ChallengeRecordingScreen;
