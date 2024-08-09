'use client'
import { Box, Stack, Typography, Button, Modal, TextField, Card, CardActions, CardContent, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import BuildIcon from '@mui/icons-material/Build';
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

import { Header } from './Components/header';
import { Body } from './Components/body';
import { AddItemModal } from './Components/addItemModal';


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

  /* runs updateInventory once after the component mounts, fetching and setting up initial data. */
  useEffect(() => {
    updateInventory()
  }, []);
  
  const addItem = async (itemName, type, quantity, description) => {
    // 1. Create a reference to the document in the 'inventory' collection with the given item name
    const docRef = doc(collection(firestore, 'inventory'), itemName.toLowerCase());
  
    // 2. Get the current document snapshot
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      // 3. If it exists, retrieve the current quantity and update it
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, { 
        quantity: currentQuantity + quantity, // Increment quantity
        type, 
        description 
      }, { merge: true }); // Use merge to avoid overwriting other fields
    } else {
      // 4. If it doesn't exist, create a new document with the provided data
      await setDoc(docRef, { 
        quantity, 
        type, 
        description 
      });
    }
  
    // 5. Refresh the inventory data to reflect changes
    await updateInventory();
  };
  /* 
  await
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

      await deleteDoc(docRef);
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

const item = [
  'tomato',
  'potato',
  'onion',
  'garlic',
  'carrot',
];

 
  return (
    <Box
      sx={{
        backgroundColor: '#D5B79B', 
        // Optional: use this as a fallback color
        backgroundImage: `url('/bg-cutting-board.webp')`, 
        // Set the background image
        backgroundSize: 'cover', 
        // Make sure the image covers the entire Box
        backgroundRepeat: 'no-repeat', 
        // Prevent the image from repeating
        backgroundPosition: 'center', 
        // Center the image
      }}
    >
      <Box
        sx={
          {
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/pantry-bg.jpeg")',
            backgroundSize: 'cover', // Make sure the image covers the entire Box
            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
            backgroundPosition: 'center', // Center the image
          }
        } 
      >
        <AddItemModal inventory={inventory} open={open} handleClose={handleClose} itemName={itemName} setItemName={setItemName} addItem={addItem}/>

        <Header handleOpen={handleOpen}  />

        <Body inventory={inventory} removeItem={removeItem}/>
      </Box>
    </Box>
  );
}
