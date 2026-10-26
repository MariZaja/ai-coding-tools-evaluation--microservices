import React, { useState, useEffect } from 'react';
import { Box, TextField, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledPopupContainer,
  StyledForm,
  SaveButton,
  CancelButton,
  PopupHeader,
} from './styles/popup.styles';

interface AddGardenPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    name: string,
    surrounding: string,
    imageBase64: string | null,
  ) => void;
}

export const AddGardenPopup: React.FC<AddGardenPopupProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [surrounding, setSurrounding] = useState('');
 const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName(''); // Clear form fields when popup is closed
      setSurrounding('');
      setImageFile(null);
      setImagePreview(null);
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
    if (name && surrounding) {
      // Convert image to Base64 for backend processing
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result
          ? (reader.result as string).split(',')[1]
          : null; // Remove Base64 prefix if necessary
        onSave(name, surrounding, imageBase64); // Pass image as Base64 string
        onClose();
      };

      if (imageFile) {
        reader.readAsDataURL(imageFile); // Trigger FileReader for the image
      } else {
        onSave(name, surrounding, null); // Handle save without image
        onClose();
      }
    }
  };

  const isSaveDisabled = !name || !surrounding;

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledPopupContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <PopupHeader variant="h6">Add New Garden</PopupHeader>
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
            label="Surrounding"
            value={surrounding}
            onChange={(e) => setSurrounding(e.target.value)}
            required
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
