const express = require('express');

// Express App
const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Listen for requests
app.listen(4000, () => {
    console.log('Listening on port 5000!!!');
});