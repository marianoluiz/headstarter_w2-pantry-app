'use client'

import { Box, Grid, Typography, Button } from '@mui/material'
import { useState } from 'react';

import SearchAppBar from './searchAppBar'
import { UpdateItemModal } from './updateItemModal'

export function Body({ inventory, removeItem, updateItem }) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenUpdateItemModal = (item) => {
    setCurrentItem(item);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateItemModal = () => {
    setOpenUpdateModal(false);
    setCurrentItem(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="85vh"
      display={'flex'}
      justifyContent={'center'}
      pt={3}
      sx={{ background: 'transparent' }}
    >
      <Box width="80vw" height="90%">
          <SearchAppBar value={searchQuery} onChange={handleSearchChange} />
        

        <Grid container width="100%" height="100%" gap={2}   
          sx={{
            overflowX: 'hidden', 
            overflowY: 'auto',  
            scrollbarWidth: 'thin', 
            scrollbarColor: '#a1a1a1 transparent', 
            padding: 2,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '0 0 5px 5px ',
          }}
        >
          {filteredInventory.map((item) => (
            <Grid
              item
              key={item.name}
              minHeight="150px"
              md={3.85}
              display={'flex'}
              direction={'column'}
              justifyContent={'space-between'}
              paddingX={5}
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'all 0.3s ease', 
                backgroundColor: 'rgba(255,255,255,.8)',
                ':hover': {
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
                  transform: 'scale(1.01)', 
                },
              }}
            >
              <Box>
                <Typography variant="h4" component="div" color={'#3c3c3c'} fontWeight={700} textAlign={'center'} py={3}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Typography>

                <Box>
                  <Typography variant={'p'} component="div" pt={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Typography>
                  <Typography variant={'p'} component="div" pt={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
              </Box>

              <Typography variant={'p'} component="div" pb={3} mt={2} sx={{ fontSize: 15 }} color="text.secondary">
                <Typography sx={{ fontSize: 14 }} mb={1}>Description:</Typography> {item.description.charAt(0).toUpperCase() + item.description.slice(1)}
              </Typography>
              
              <Box display={'flex'} justifyContent={'space-between'}>
                <Button variant="contained" color="primary" sx={{mb:4, width: '45%'}} onClick={() => handleOpenUpdateItemModal(item)}>
                  Update
                </Button>
                <Button variant="contained" color="error" sx={{ backgroundColor: '#ef5350', mb: 4, width: '45%' }} onClick={() => removeItem(item.name)}>
                  Remove
                </Button>
              </Box>

            </Grid>
          ))}
        </Grid>
      </Box>
      <UpdateItemModal
        handleCloseUpdateItemModal={handleCloseUpdateItemModal}
        openUpdateModal={openUpdateModal}
        currentItem={currentItem}
        updateItem={updateItem}
      />
    </Box>
  )
}
