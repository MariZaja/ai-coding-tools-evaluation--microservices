import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Plant, CreatePlantInput, Garden } from '../models';
import {
  StyledCard,
  StyledGardenImage,
  StyledGardenName,
  StyledGardenSurrounding,
  StyledHeader,
} from './styles/user.styles';
import { AddPlantPopup } from './add.plant.popup';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { addGardenPlant, getPlantsByGardenId } from '../services';

export const GardenPage: React.FC = () => {
  const navigate = useNavigate();
  const [plantsData, setPlantsData] = useState<Plant[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id, name } = useParams();

  useEffect(() => {
    getPlantsByGardenId(id || '').then((data) => {
      setPlantsData(data || null);
    });
  }, []);

  const plantImage = '../assets/placeholder_plant.jpg';

  const handleAddGardenPlant = (
    plant: CreatePlantInput,
    imageBase64: string | null,
  ) => {
    const gardenId = parseInt(id || '');
    const createPlant: CreatePlantInput = {
      ...plant,
      image: imageBase64,
    };
    addGardenPlant(gardenId, createPlant).then((newPlant: Plant) => {
      getPlantsByGardenId(id || '').then((data) => {
        setPlantsData(data || null);
      });
    });
  };

  return (
    <Box sx={{ padding: '100px', backgroundColor: '#FFFEF6' }}>
      <StyledHeader variant="h2">
        {capitalizeFirstLetter(name || 'Unknown')}
      </StyledHeader>

      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {plantsData.map((plant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
            <StyledCard
              onClick={() => navigate(`/garden/${id}/plant/${plant.id}`)}
            >
              <StyledGardenImage src={plant.image || plantImage} alt="Garden Image" />
              <StyledGardenName variant="h4">{plant.name}</StyledGardenName>
              <StyledGardenSurrounding variant="body1">
                {capitalizeFirstLetter(plant.notes || 'Unknown')}
              </StyledGardenSurrounding>
            </StyledCard>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StyledCard
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '211px',
            }}
          >
            <IconButton
              size="large"
              sx={{ color: '#363732' }}
              onClick={() => setIsPopupOpen(true)}
            >
              <AddIcon sx={{ fontSize: '48px' }} />
            </IconButton>
          </StyledCard>
        </Grid>
      </Grid>

      <AddPlantPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleAddGardenPlant}
        gardenId={id || ''}
      />
    </Box>
  );
};
