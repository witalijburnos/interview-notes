// Utility function to fetch subtitles for a YouTube video using the SUPADATA API.
// - Takes a YouTube URL as input.
// - Returns the full transcript text of the video.


const axios = require('axios');

const fetchSubtitles = async (url) => {
  try {
    const apiUrl = `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(url)}&text=true`;
    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': process.env.SUPADATA_API_KEY,
      },
    });

    if (!response.data || !response.data.content) {
      throw new Error('No transcript data received from SUPADATA.');
    }

    return response.data.content;
  } catch (error) {
    console.error('Error fetching subtitles:', error.response?.data || error.message);
    throw new Error('Failed to fetch subtitles from SUPADATA.');
  }
};

module.exports = fetchSubtitles;
