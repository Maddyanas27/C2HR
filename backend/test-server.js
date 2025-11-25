
const express = rconst PORT = 5003;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});re('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Add companies route directly
app.get('/api/companies', (req, res) => {
  res.json({ message: 'Companies route working' });
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(Test server running on port \);
});

