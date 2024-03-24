const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const host=process.env.HOSTNAME ||'http://ec2-3-84-142-237.compute-1.amazonaws.com';
const PORT = process.env.PORT || 3002; 


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB connection
mongoose.connect('mongodb+srv://Manisha:Malbany23$@cluster0.avzcwe1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define multer storage for local file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Save files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename provided by the client
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(cors());

// Define inventory item schema
const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  imageURL: String
});

const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

// API endpoint to add new inventory item
app.post('/api/inventory', async (req, res) => {
  const { name, quantity, imageURL } = req.body;
  try {
    const newItem = await InventoryItem.create({ name, quantity, imageURL });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ error: 'Error adding inventory item' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      // If no file is received, respond with an error
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = req.file.path; // Path where the image is saved
    const imageURL = `http://ec2-3-84-142-237.compute-1.amazonaws.com:3002/${imagePath}`;
    res.json({ imageURL }); // Respond with the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});


// API endpoint to update an existing inventory item
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, { name, quantity }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Error updating inventory item' });
  }
});

// API endpoint to delete an existing inventory item
app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'Error deleting inventory item' });
  }
});

// API endpoint to fetch all inventory items
app.get('/api/inventory', async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ error: 'Error fetching inventory items' });
  }
});

// Serve static files from the 'Public' folder
app.use(express.static(path.join(__dirname, 'Public')));

// API endpoint for addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = Number(num1) + Number(num2);
  res.json({ result: sum });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
