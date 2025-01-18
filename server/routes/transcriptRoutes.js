// Handles requests to process a YouTube video URL and extract questions from its subtitles.
// - GET /api/transcript: Takes a YouTube URL, fetches subtitles, splits them into chunks, 
//   and processes them with GPT to extract questions.


const express = require('express');
const fetchSubtitles = require('../utils/fetchSubtitles');
const processWithGPT = require('../utils/gptProcessor');

const router = express.Router();

router.get('/', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const transcript = await fetchSubtitles(videoUrl);
    const chunks = transcript.match(/.{1,3000}/g); // Разделение на части по 3000 символов
    const questions = await processWithGPT(chunks);

    if (questions.length === 0) {
      throw new Error('No valid questions extracted.');
    }

    res.json({ questions });
  } catch (error) {
    console.error('Error in transcript processing:', error.message);
    res.status(500).send({ error: 'Failed to process transcript.', details: error.message });
  }
});

module.exports = router;
