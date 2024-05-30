// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListingPage from './ListingPage';
import DetailPage from './DetailPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ListingPage} />
                <Route path="/plants/:id" component={DetailPage} />
            </Switch>
        </Router>
    );
};

export default App;
