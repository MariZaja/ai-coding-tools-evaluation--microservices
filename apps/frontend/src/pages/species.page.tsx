import React, { useState, useEffect } from 'react';
import { Box, Grid, InputAdornment } from '@mui/material';
import { getAllSpecies } from '../services';
import { StyledSearchBar } from './styles/species.styles';
import { Species } from '../models';
import SearchIcon from '@mui/icons-material/Search';
import PlantCard from './plant.card';

export const SpeciesPage: React.FC = () => {
  const [plants, setPlants] = useState<Species[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getAllSpecies().then((data) => {
      setPlants(data || []);
    });
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box sx={{ padding: '100px', backgroundColor: '#FFFEF6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <StyledSearchBar
          variant="outlined"
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginTop: '20px', maxHeight: '80vh', overflowY: 'auto' }}
      >
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </Grid>
    </Box>
  );
};
