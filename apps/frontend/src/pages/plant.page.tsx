import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  SpeciesContainer,
  StyledPaper,
  StyledImage,
  StyledNotesBox,
  StyledPlantBox,
  StyledSpecieBox,
} from './styles/plant.styles';
import { Plant, Species } from '../models';
import { getPlantById, getSpecieById } from '../services';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';

const PlantPage: React.FC = () => {
    const navigate = useNavigate();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [specie, setSpecie] = useState<Species | null>(null);
    const { gardenId, plantId } = useParams();

    useEffect(() => {
        getPlantById(gardenId || '', plantId || '').then((data) => {
          setPlant(data || null);
          getSpecieById(data?.speciesId || '').then((data) => {
            setSpecie(data || null);
          });
        });
    }, []);

    const image = plant?.image || '../assets/placeholder_plant.jpg';

    return (
      <SpeciesContainer>
        <StyledPaper>
          <StyledImage src={image} alt="Tree" />
          <Box sx={{ flexDirection: 'column' }}>
            <StyledSpecieBox>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                onClick={() => navigate(`/species/${specie?.id}`)}
              >
                Specie: {capitalizeFirstLetter(specie?.name ?? 'Unknown')}
              </Typography>
            </StyledSpecieBox>
            <StyledPlantBox>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Name: {capitalizeFirstLetter(plant?.name ?? 'Unknown')}
              </Typography>
            </StyledPlantBox>
            <StyledNotesBox>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Notes:
              </Typography>
              <Typography variant="body1">
                {capitalizeFirstLetter(plant?.notes ?? 'Unknown')}
              </Typography>
            </StyledNotesBox>
          </Box>
        </StyledPaper>
      </SpeciesContainer>
    );
};

export default PlantPage;
