import React from 'react';
import { Grid } from '@mui/material';
import {
  StyledCard,
  StyledPlantImage,
  StyledPlantName,
} from './styles/species.styles';
import { Species } from '../models';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';

interface PlantCardProps {
  plant: Species;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
      <StyledCard>
        <StyledPlantImage
          src={plant.default_image}
          alt={plant.name}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/assets/placeholder_plant.jpg';
          }}
          onClick={() => navigate(`/species/${plant.id}`)}
        />
        <StyledPlantName variant="h4">
          {capitalizeFirstLetter(plant.name || 'Unknown')}
        </StyledPlantName>
      </StyledCard>
    </Grid>
  );
};

export default PlantCard;
