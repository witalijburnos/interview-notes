// Utility function to process text chunks using GPT API.
// - Splits input into manageable chunks and sends each to GPT for processing.
// - Extracts questions from text and returns them as a structured JSON array.


const axios = require('axios');

const processWithGPT = async (chunks) => {
  const results = [];

  for (const chunk of chunks) {
    try {
      const openAiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an assistant that receives subtitles of a technical interview video. Extract all questions from the text, correct their punctuation and grammar, and return them as a JSON array of objects with the property "question". Ensure the JSON is valid, all keys are double-quoted, and there are no extra characters or text outside the JSON.',
            },
            { role: 'user', content: chunk },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      let rawResponse = openAiResponse.data.choices[0]?.message?.content;

      if (rawResponse.startsWith('```json')) {
        rawResponse = rawResponse.replace(/```json|```/g, '').trim();
      }

      const parsed = JSON.parse(rawResponse);
      if (Array.isArray(parsed)) {
        results.push(...parsed);
      }
    } catch (error) {
      console.error('Error processing chunk:', error.message);
    }
  }

  return results;
};

module.exports = processWithGPT;
