'use client'

import { Box, Stack, Typography, Button, Modal, TextField, Card, CardActions, CardContent, Grid } from '@mui/material'



export function Body({ inventory, addItem, removeItem }) {
  return(
  <Box
  width="100vw"
  height="85vh"
  display={'flex'}
  justifyContent={'center'}
  pt={3}
  sx={{backgroundColor: '#D5B79B'}}
  >
  
        
  {/* container */}
  <Box 
    width="80vw"
    height="70%"
    >

    
    <Grid container width="100%" height="100%" gap={2}   
      sx={{
        overflowX: 'hidden',  // Hide horizontal overflow
        overflowY: 'auto',  // Enable vertical scrolling
        scrollbarWidth: 'thin',  // Firefox
        scrollbarColor: '#a1a1a1 transparent',  // Firefox
        padding: 2,
      }}
      >
      {inventory.map(({name, quantity}) => (
        <Grid
          item
          key={name}
          minHeight="150px"
          md={3.85}
          display={'flex'}
          direction={'column'}
          justifyContent={'space-between'}
          paddingX={5}
          sx={{
            bgcolor: '#ffffff', // White background
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
            transition: 'all 0.3s ease', // Smooth transition for hover effects
            backgroundColor: '#d6c6b8',
            ':hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Shadow on hover
              transform: 'scale(1.01)', // Slight zoom effect on hover
            },
          }}
        >
          <Box>
            {/* Product */}
            <Typography variant="h4" component="div" color={'#333'} fontWeight={700} textAlign={'center'} py={3}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Box>
              <Typography variant={'p'}  component="div" pt={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Type: Food
              </Typography>
              <Typography variant={'p'}  component="div" pt={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Quantity: {quantity}
              </Typography>
            </Box>
            
            <Typography variant={'p'} component="div" color={'#333'} py={1} mt={2}>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          </Box>


          <Button variant="contained" color="error"  sx={{ backgroundColor: '#ef5350', mb: 4 }}  onClick={() => removeItem(name)}>
            Remove
          </Button>
        </Grid>
      ))}
    </Grid>
  </Box>
  {/* container end */}
  </Box>

  )
  
}