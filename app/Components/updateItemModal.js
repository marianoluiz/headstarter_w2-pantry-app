'use client'

import { Box, Stack, Typography, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

export function UpdateItemModal({ handleCloseUpdateItemModal, currentItem, updateItem, openUpdateModal }) 
{
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentItem) {
      setItemName(currentItem.name);
      setQuantity(currentItem.quantity);
      setType(currentItem.type);
      setDescription(currentItem.description);
    }
  }, [currentItem]);

  const handleUpdate = () => {
    const updatedItem = { itemName, quantity, type, description };
    updateItem(updatedItem, currentItem.name); // Pass the original name
    handleCloseUpdateItemModal();
  };

  return (
    <Modal
      open={openUpdateModal}
      onClose={handleCloseUpdateItemModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Item
        </Typography>
        <Stack width="100%" spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { min: 1, step: 1 }
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={'fruits'}>Fruits</MenuItem>
              <MenuItem value={'vegetable'}>Vegetable</MenuItem>
              <MenuItem value={'grains'}>Grains</MenuItem>
              <MenuItem value={'proteins'}>Proteins</MenuItem>
              <MenuItem value={'dairy'}>Dairy</MenuItem>
              <MenuItem value={'fats'}>Fats</MenuItem>
              <MenuItem value={'misc'}>Misc</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="outlined" component="div" onClick={handleUpdate}>
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
