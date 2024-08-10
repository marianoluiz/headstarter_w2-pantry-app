'use client'
import { Box, Typography, Button, } from '@mui/material'
import BuildIcon from '@mui/icons-material/Build';
import Image from 'next/image';
import thumbsUp from '/public/thumbs-up.png';


export function Header({ handleOpenAddItemModal }) {
  return(
    <Box
    width={"100%"}
    height={"15vh"}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    paddingX={20}
    sx={{background: 'rgba(255, 255, 255, 0.9)'}}
  >
    <Box  display={'flex'} alignItems={'center'} > 
    <Image
        src={thumbsUp}  // Correct path relative to the public directory
        alt="Thumbs Up"
        width={50}  // Width of the image
        height={50} // Height of the image
      />
      <Typography   variant="h4" color={'primary'} fontWeight={700} marginLeft={2}>
        Virtual Pantry
      </Typography>
      {/* <BuildIcon fontSize="medium" color="#424242"/> */}

    </Box>
    {/* add item button */}
    <Button variant="contained" onClick={handleOpenAddItemModal}>
      Add Item
    </Button>

  </Box>
  )
}