// Handles saving, retrieving, and deleting question-answer pairs.
// - GET /api/pair: Retrieves all saved question-answer pairs.
// - POST /api/pair: Saves a new question-answer pair.
// - DELETE /api/pair: Deletes a question-answer pair by question.


const express = require('express');
const { getSavedPairs, savePair, deletePair } = require('../utils/fileHandler');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const pairs = getSavedPairs();
    res.json(pairs);
  } catch (error) {
    console.error('Error retrieving pairs:', error.message);
    res.status(500).send({ error: 'Failed to retrieve pairs.' });
  }
});

router.post('/', (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).send({ error: 'Question and answer are required.' });
  }

  try {
    savePair(question, answer);
    res.send({ success: true });
  } catch (error) {
    console.error('Error saving pair:', error.message);
    res.status(500).send({ error: 'Failed to save pair.' });
  }
});

router.delete('/', (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: 'Question is required.' });
  }

  try {
    deletePair(question);
    res.send({ success: true });
  } catch (error) {
    console.error('Error deleting pair:', error.message);
    res.status(500).send({ error: 'Failed to delete pair.' });
  }
});

module.exports = router;
