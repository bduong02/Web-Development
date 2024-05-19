import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChallengeCreationScreen from '../ChallengeCreationScreen';

describe('ChallengeCreationScreen', () => {
    test('renders create challenge form', () => {
        render(
            <Router>
                <ChallengeCreationScreen />
            </Router>
        );

        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByText(/\+/i)).toBeInTheDocument();
        expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });

    test('adds a new segment', () => {
        render(
            <Router>
                <ChallengeCreationScreen />
            </Router>
        );

        fireEvent.click(screen.getByText(/\+/i));
        const segmentInputs = screen.getAllByRole('textbox');
        expect(segmentInputs).toHaveLength(2); // One for challenge name, one for segment name
    });

    test('saves a challenge', () => {
        const { getByText, getByLabelText } = render(
            <Router>
                <ChallengeCreationScreen />
            </Router>
        );

        fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'New Challenge' } });
        fireEvent.click(getByText(/Create/i));

        const storedChallenges = JSON.parse(localStorage.getItem('challenges'));
        expect(storedChallenges).toHaveLength(1);
        expect(storedChallenges[0].name).toBe('New Challenge');
    });
});
