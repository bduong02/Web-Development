import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChallengeListingScreen from '../ChallengeListingScreen';

describe('ChallengeListingScreen', () => {
    beforeEach(() => {
        localStorage.setItem('challenges', JSON.stringify([{ name: '1 mi track' }, { name: '3 mi trail' }]));
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('renders list of challenges', () => {
        render(
            <Router>
                <ChallengeListingScreen />
            </Router>
        );

        expect(screen.getByText('1 mi track')).toBeInTheDocument();
        expect(screen.getByText('3 mi trail')).toBeInTheDocument();
    });

    test('renders create challenge button', () => {
        render(
            <Router>
                <ChallengeListingScreen />
            </Router>
        );

        expect(screen.getByText('+')).toBeInTheDocument();
    });
});
