import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChallengeRecordingScreen from '../ChallengeRecordingScreen';

const mockChallenges = [
    { name: '3 mi trail', segments: [{ name: 'Boathouse' }, { name: 'Wallingford' }, { name: 'Bathhouse' }, { name: 'Theater' }] }
];

describe('ChallengeRecordingScreen', () => {
    beforeEach(() => {
        localStorage.setItem('challenges', JSON.stringify(mockChallenges));
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('renders challenge name and segments', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/record/:id" element={<ChallengeRecordingScreen />} />
                </Routes>
            </Router>
        );

        window.history.pushState({}, 'Test', '/record/0');

        expect(screen.getByText('3 mi trail')).toBeInTheDocument();
        expect(screen.getByText('Boathouse:')).toBeInTheDocument();
        expect(screen.getByText('Wallingford:')).toBeInTheDocument();
        expect(screen.getByText('Bathhouse:')).toBeInTheDocument();
        expect(screen.getByText('Theater:')).toBeInTheDocument();
    });

    test('starts and pauses the timer', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/record/:id" element={<ChallengeRecordingScreen />} />
                </Routes>
            </Router>
        );

        window.history.pushState({}, 'Test', '/record/0');

        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);

        expect(screen.getByText('Resume')).toBeInTheDocument();
    });

    test('records segment times', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/record/:id" element={<ChallengeRecordingScreen />} />
                </Routes>
            </Router>
        );

        window.history.pushState({}, 'Test', '/record/0');

        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        const nextSegmentButton = screen.getByText('Next Segment');
        fireEvent.click(nextSegmentButton);

        expect(screen.getByText(/Boathouse: [0-9]{2}:[0-9]{2}/)).toBeInTheDocument();
    });
});
