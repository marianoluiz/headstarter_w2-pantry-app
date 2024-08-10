'use client'

import { Box, Stack, Typography, Button, Modal, TextField, Card, CardActions, CardContent, Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import React, { useState } from 'react';

export function AddItemModal({ itemName, openAddItemModal, handleCloseAddItemModal, addItem, setItemName}) {

  const [type, setType] = useState(''); 
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [description, setDescription] = useState('');

  return(

  /* 
  in modal, there is bracket in open and handleClose because it is javascript variable /function
  `open` is state variable 
  */

  <Modal
    open={openAddItemModal}
    onClose={handleCloseAddItemModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={
      {
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
      }
      }>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Item
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
            inputProps: { 
              min: 1, // Ensure the minimum value is 1
              step: 1,  // Ensure that the step is 1
            }
          }}
        />

        {/* select */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e)=>setType(e.target.value)}
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
        {/* select */}

        {/* textfield */}
        <TextField
          id="outlined-textarea"
          label="Description"
          placeholder="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* textfield end */}

        <Button
          variant="outlined"
          component="div"
          onClick={() => {
            addItem(itemName, type, quantity, description)
            setItemName('')
            setType('')
            setQuantity(1)
            setDescription('')
            handleCloseAddItemModal()
          }}>
          Add
        </Button>
      </Stack>
    </Box>
  </Modal>

  )

}