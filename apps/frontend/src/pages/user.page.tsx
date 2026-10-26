import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getCurrentUser, getAllUserGardens, addGardenPlant } from '../services';
import { Garden } from '../models';
import {
  StyledCard,
  StyledGardenImage,
  StyledGardenName,
  StyledGardenSurrounding,
  StyledHeader,
} from './styles/user.styles';
import { useNavigate } from 'react-router-dom';
import { AddGardenPopup } from './add.garden.popup';
import { CreateGarden } from '../models/Garden';
import { addGarden } from 'src/services';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';

export const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [gardenData, setGardenData] = useState<Garden[]>([]);
  const [currentUser, setCurrentUser] = useState<String>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((response): void => {
      setCurrentUser(response?.data?.id || '');
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getAllUserGardens(currentUser).then((response) => {
        setGardenData(response?.data || []);
      });
    }
  }, [currentUser, addGarden]);

  const gardenImage = '../assets/placeholder_plant.jpg';

  const user = JSON.parse(localStorage.getItem('user') ?? '{}').username;

  const handleAddGarden = (
    name: string,
    surrounding: string,
    imageBase64: string | null,
  ) => {
    const garden: CreateGarden = {
      user_id: parseInt(currentUser as string),
      name,
      surrounding,
      creation_date: new Date().toISOString(),
      image: imageBase64,
    };
    addGarden(garden).then(() => {
      if (currentUser) {
        getAllUserGardens(currentUser).then((response) => {
          setGardenData(response?.data || []);
        });
      }
    });
  };


  return (
    <Box sx={{ padding: '100px', backgroundColor: '#FFFEF6' }}>
      <StyledHeader variant="h2">
        Welcome, {capitalizeFirstLetter(user || 'Unknown')}
      </StyledHeader>

      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {gardenData.map((garden) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={garden.id}>
            <StyledCard
              onClick={() => navigate(`/garden/${garden.id}/${garden.name}`)}
            >
              <StyledGardenImage src={garden.image || gardenImage} alt="Garden Image" />
              <StyledGardenName variant="h4">
                {capitalizeFirstLetter(garden.name)}
              </StyledGardenName>
              <StyledGardenSurrounding variant="body1">
                {capitalizeFirstLetter(garden.surrounding)}
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

      <AddGardenPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleAddGarden}
      />
    </Box>
  );
};
