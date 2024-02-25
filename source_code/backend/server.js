const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const host=process.env.HOSTNAME || 'http://ec2-3-16-138-21.us-east-2.compute.amazonaws.com/';
const PORT = process.env.PORT || 6000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'Public')));

app.use(express.json());

// Use the cors middleware
app.use(cors());

// API endpoint for addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = Number(num1) + Number(num2);
  res.json({ result: sum });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
