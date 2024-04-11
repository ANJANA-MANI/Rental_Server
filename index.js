// Importing required modules
require('dotenv').config(); // dotenv for loading environment variables
const express = require('express'); // Express.js for server framework
const cors = require('cors'); // CORS middleware for enabling cross-origin requests
const router = require('./Router/router');
require('./DB/connection');

// Creating an Express server instance
const pserver = express();

// Applying middleware
pserver.use(cors()); // Enable CORS
pserver.use(express.json()); // Allowing parsing JSON requests
pserver.use('/uploads', express.static('uploads'));
pserver.use(router); // Mounting router middleware

// Setting up the port to listen on
const PORT = process.env.PORT || 4000; // Using port 4000 or the one set in environment variable PORT

// Start listening on the specified port
pserver.listen(PORT, () => {
    console.log(`SERVER LISTENING ${PORT}`);
});
