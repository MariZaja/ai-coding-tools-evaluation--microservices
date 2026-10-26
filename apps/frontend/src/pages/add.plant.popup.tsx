import React, { useState, useEffect } from 'react';
import {Autocomplete, Box, TextField, Dialog, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CreatePlantInput, SpeciesList } from '../models';
import { getAllSpeciesNames } from '../services';
import {
  StyledPopupContainer,
  StyledForm,
  SaveButton,
  CancelButton,
  PopupHeader,
} from './styles/popup.styles';

interface AddPlantPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (plant: CreatePlantInput, imageBase64: string | null) => void;
  gardenId: string;
}

export const AddPlantPopup: React.FC<AddPlantPopupProps> = ({
  open,
  onClose,
  onSave,
  gardenId,
}) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [speciesData, setSpeciesData] = useState<SpeciesList[]>([]);

  useEffect(() => {
    if (open) {
      getAllSpeciesNames().then((response) => {
        setSpeciesData(response || []);
      });
    }
  }, );

  useEffect(() => {
    if (!open) {
      setName('');
      setNotes('');
      setImageFile(null);
      setImagePreview(null);
      setSelectedSpecies('');
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string); // Preview the image
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleSave = () => {
    if (name && notes) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result
          ? (reader.result as string).split(',')[1]
          : null; // Remove Base64 prefix if necessary
        onSave(
          { name, notes, gardenId: +gardenId, speciesId: +selectedSpecies },
          imageBase64,
        ); // Pass image as Base64 string
        onClose();
      };
      if (imageFile) {
        reader.readAsDataURL(imageFile); // Trigger FileReader for the image
      } else {
        onSave(
          { name, notes, gardenId: +gardenId, speciesId: +selectedSpecies },
          null,
        ); // Handle save without image
        onClose();
      }
    }
  };

  const isSaveDisabled = !name || !notes;

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledPopupContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <PopupHeader variant="h6">Add New Plant</PopupHeader>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledForm>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
          />
          <Autocomplete
            options={speciesData} // Array of options
            getOptionLabel={(specie) => specie.name} // Display the name in the dropdown
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Specie"
                placeholder="Search species"
                required
              />
            )}
            value={
              speciesData.find((specie) => specie.id === selectedSpecies) ||
              null
            }
            onChange={(event, newValue) =>
              setSelectedSpecies(newValue ? newValue.id : '')
            }
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ margin: '20px 0' }}
          />
          {imagePreview && (
            <Box mt={2} textAlign="center">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <SaveButton onClick={handleSave} disabled={isSaveDisabled}>
              Save
            </SaveButton>
          </Box>
        </StyledForm>
      </StyledPopupContainer>
    </Dialog>
  );
};
