'use client'

import { Box, Stack, Typography, Button, Modal, TextField, Card, CardActions, CardContent, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

import BuildIcon from '@mui/icons-material/Build';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const item = [
  'tomato',
  'potato',
  'onion',
  'garlic',
  'carrot',
];


export default function Home() {


  /* Add state management */

    /* store the list of inventory items fetched from Firestore. */
  const [inventory, setInventory] = useState([]);

    /*  manages the visibility of the modal (the one with the add item) */
  const [open, setOpen] = useState(false);
    /* stores the name of the item */
  const [itemName, setItemName] = useState('');



  /* Implement inventory fetching to fetch inventory data from Firestore: */

  const updateInventory = async () => {
    // 1. Define a query to get all documents from the 'inventory' collection
    const snapshot = query(collection(firestore, 'inventory'));
    // 2. Execute the query to get the documents
    const docs = await getDocs(snapshot);
    // 3. Initialize an empty array to store the inventory items
    const inventoryList = [];
    // 4. Loop through each document in the result
    docs.forEach((doc) => {
    // 5. Push the document ID and its data into the inventory list
      inventoryList.push({ name: doc.id, ...doc.data() })
    });
    // 6. Update the state with the new inventory list
    setInventory(inventoryList)
  };
  /* Run side-effect: runs updateInventory once after the component mounts, 
  fetching and setting up initial data. */
  useEffect(() => {
    updateInventory()
  }, []);
  
  /* Implement add and remove functions to handle adding and removing items: */

  const addItem = async (item) => {
  // 1. Create a reference to the document in the 'inventory' collection with the given item name
  const docRef = doc(collection(firestore, 'inventory'), item);
  // 2. Get the current document snapshot
  const docSnap = await getDoc(docRef);

  // 3. Check if the document exists
  if (docSnap.exists()) {
  // 4. If it exists, retrieve the current quantity (destructuring)
  const { quantity } = docSnap.data();
  
  // 5. Update the document with the new quantity (increment by 1)
  await setDoc(docRef, { quantity: quantity + 1 });
  } else {
    // 6. If it doesn't exist, create a new document with quantity 1
    await setDoc(docRef, { quantity: 1 });
  }

  // 7. Refresh the inventory data to reflect changes
  await updateInventory();
}
  /* 
  
  await getDoc(docRef): This pauses the execution of addItem until the getDoc(docRef) Promise resolves. This Promise resolves to a snapshot of the document in Firestore. If the document is not yet retrieved, the function waits here.

  await setDoc(docRef, { quantity: quantity + 1 }): After checking if the document exists, this line pauses execution until setDoc(docRef, { quantity: quantity + 1 }) completes. This Promise resolves when the document is successfully updated with the new quantity.

  await updateInventory(): This ensures that the updateInventory() function (which might also contain await calls) completes before the addItem function finishes. This way, your UI is updated with the latest inventory data.

  */

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      /*  (destructuring) */
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  /* Add modal control functions to manage the modal state */

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  /* 
    handleOpen(): Sets open to true, which opens the modal.
    handleClose(): Sets open to false, which closes the modal.
  */
 
  return (
    
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >

{/* modal start */}
{/* 
in modal, there is bracket in open and handleClose because it is javascript variable /function
`open` is state variable 
*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
      {/* modal end */}
            
      {/* container */}
      <Box 
        border={'1px solid #333'}
        width="80vw"
        height="80vh"
        >
          {/* header */}
        <Box
          width="100%"
          height="10%"
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingX={10}
        >
          <Box  display={'flex'} alignItems={'center'}>
            <Typography   variant="h5" color={'#333'} marginRight={2}>
              Virtual Storage
            </Typography>
            <BuildIcon fontSize="medium" color="#424242"/>
          </Box>
          {/* add item button */}
          <Button variant="contained" onClick={handleOpen}>
            Add Item
          </Button>
        </Box>
        
        <Grid container width="100%" height="500px" gap={2}   
          sx={{
            overflowX: 'hidden',  // Hide horizontal overflow
            overflowY: 'scroll',  // Enable vertical scrolling
            scrollbarWidth: 'thin',  // Firefox
            scrollbarColor: 'grey transparent',  // Firefox
            paddingLeft: 2,
          }}
          >
          {inventory.map(({name, quantity}) => (
            <Grid
              item
              key={name}
              minHeight="150px"
              md={3.85}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              paddingX={5}
              sx={{
                bgcolor: '#ffffff', // White background
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                transition: 'all 0.3s ease', // Smooth transition for hover effects
                ':hover': {
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Shadow on hover
                  transform: 'scale(1.02)', // Slight zoom effect on hover
                },
              }}
            >
              <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* container end */}
    </Box>
    /* body end*/
  );
}
