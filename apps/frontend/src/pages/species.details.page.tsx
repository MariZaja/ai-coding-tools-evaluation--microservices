import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import {
  faLeaf,
  faTree,
  faWater,
  faSun,
  faHand,
  faAppleWhole,
} from '@fortawesome/free-solid-svg-icons';
import {
  SpeciesContainer,
  StyledPaper,
  StyledImage,
  OverlayBox1,
  OverlayBox2,
  StyledGridItem,
  StyledParametersBox,
  Icon,
} from './styles/species.details.styles';
import { Species } from '../models';
import { getSpecieById } from '../services/SpeciesService';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';

const SpeciesDetailsPage: React.FC = () => {
  const [specie, setSpecie] = useState<Species | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getSpecieById(id || '').then((data) => {
      setSpecie(data || null);
    });
  }, []);

  const image = specie?.default_image || '';

  const items = [
    {
      icon: faHand,
      label:
        'Maintenance: ' +
        capitalizeFirstLetter(specie?.maintenance || 'Unknown'),
    },
    {
      icon: faSun,
      label:
        'Sunlight: ' + capitalizeFirstLetter(specie?.sunlight || 'Unknown'),
    },
    {
      icon: faLeaf,
      label:
        'Poisonous: ' + capitalizeFirstLetter(specie?.poisonous.toString() || 'Unknown'),
    },
    {
      icon: faWater,
      label:
        'Watering: ' + capitalizeFirstLetter(specie?.watering || 'Unknown'),
    },
    {
      icon: faTree,
      label: 'Size: ' + capitalizeFirstLetter(specie?.size || 'Unknown'),
    },
    {
      icon: faAppleWhole,
      label:
        'Edible parts: ' +
        capitalizeFirstLetter(specie?.edible_parts || 'Unknown'),
    },
  ];

  return (
    <SpeciesContainer>
      <StyledPaper>
        <Box sx={{ position: 'relative', height: 400, right: '200px' }}>
          <StyledImage src={image} alt="Tree" />
          <OverlayBox1>
            <OverlayBox2>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {capitalizeFirstLetter(specie?.name ?? 'Unknown')}
              </Typography>
              <Typography variant="body2">
                {specie?.description ?? 'Unknown'}
              </Typography>
            </OverlayBox2>
          </OverlayBox1>
        </Box>
        <StyledParametersBox>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {items.map((item, index) => (
              <StyledGridItem item xs={12} sm={6} md={4} key={index}>
                <Icon icon={item.icon} />
                {item.label}
              </StyledGridItem>
            ))}
          </Grid>
        </StyledParametersBox>
      </StyledPaper>
    </SpeciesContainer>
  );
};

export default SpeciesDetailsPage;
