// Handles requests to fetch answers for specific questions using GPT API.
// - POST /api/answer: Takes a question as input and returns an AI-generated answer.


const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: 'Question is required' });
  }

  try {
    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Provide a precise answer to the question.' },
          { role: 'user', content: question },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = openAiResponse.data.choices[0]?.message?.content;
    res.json({ answer });
  } catch (error) {
    console.error('Error fetching answer:', error.message);
    res.status(500).send({ error: 'Failed to fetch answer.', details: error.message });
  }
});

module.exports = router;
