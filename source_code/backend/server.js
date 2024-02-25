const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'Public' folder
app.use(express.static(path.join(__dirname, 'Public')));

// API endpoint for addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = Number(num1) + Number(num2);
  res.json({ result: sum });
});

console.log(Server is running on port ${port});