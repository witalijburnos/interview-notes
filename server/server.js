// Entry point for the backend server.
// Sets up middleware, routes, and starts the server.


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transcriptRoutes = require('./routes/transcriptRoutes');
const answerRoutes = require('./routes/answerRoutes');
const pairRoutes = require('./routes/pairRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transcript', transcriptRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/pair', pairRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
