// src/pages/ListingPage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlantCard from './PlantCard';

const ListingPage = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch('https://cpsc4910sq24.s3.amazonaws.com/data/plants.json')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    return (
        <Container>
            <h1>Plant Palace</h1>
            {plants.map((plant, index) => (
                <PlantCard key={index} plant={plant} />
            ))}
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
`;

export default ListingPage;
