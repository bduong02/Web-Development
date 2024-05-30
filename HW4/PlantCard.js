// src/components/PlantCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
    return (
        <Card>
            <ImageWrapper>
                <Image src={`https://cpsc4910sq24.s3.amazonaws.com/images/${plant.image}`} alt={plant.name} />
            </ImageWrapper>
            <Info>
                <h2>{plant.name}</h2>
                <p>{plant.species}</p>
                <p>{plant.cultivar}</p>
                <p>{plant.lifeStage}</p>
                <Link to={`/plants/${plant.id}`}>View Details</Link>
            </Info>
        </Card>
    );
};

const Card = styled.article`
  display: flex;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;

const Info = styled.div`
  flex: 2;
  padding-left: 20px;
`;

export default PlantCard;
