// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailPage = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [harvests, setHarvests] = useState([]);

    useEffect(() => {
        fetch(`https://cpsc4910sq24.s3.amazonaws.com/data/plants/${id}.json`)
            .then(response => response.json())
            .then(data => setPlant(data));

        fetch(`https://cpsc4910sq24.s3.amazonaws.com/data/plants/${id}/harvests.json`)
            .then(response => response.json())
            .then(data => setHarvests(data));
    }, [id]);

    if (!plant) return <div>Loading...</div>;

    return (
        <Container>
            <Header>
                <Image src={`https://cpsc4910sq24.s3.amazonaws.com/images/${plant.image}`} alt={plant.name} />
                <Info>
                    <h1>{plant.name}</h1>
                    <p>{plant.species}</p>
                    <p>{plant.cultivar}</p>
                    <p>{plant.lifeStage}</p>
                </Info>
            </Header>
            <Harvests>
                <h2>Harvests</h2>
                <Table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {harvests.map((harvest, index) => (
                        <tr key={index}>
                            <td>{harvest.date}</td>
                            <td>{harvest.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Harvests>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;

const Info = styled.div`
  padding-left: 20px;
`;

const Harvests = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background-color: #f0f0f0;
  }
`;

export default DetailPage;
