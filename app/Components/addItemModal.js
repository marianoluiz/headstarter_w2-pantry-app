'use client'

import { Box, Stack, Typography, Button, Modal, TextField, Card, CardActions, CardContent, Grid } from '@mui/material'


export function AddItemModal({ itemName, open, handleClose, addItem, setItemName}) {

  return(

  /* 
  in modal, there is bracket in open and handleClose because it is javascript variable /function
  `open` is state variable 
  */

  <Modal
    open={open}
    onClose={handleClose}
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
      <Stack width="100%" direction={'row'} spacing={2}>
        <TextField
          id="outlined-basic"
          label="Item"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  </Modal>

  )

}