// Utility functions to interact with backend API

// Fetch all saved question-answer pairs
export const fetchSavedPairs = async () => {
  const response = await fetch('http://localhost:5000/api/pair');
  return response.json();
};

// Fetch subtitles and extract questions from a YouTube video
export const getTranscript = async (videoUrl) => {
  const response = await fetch(
    `http://localhost:5000/api/transcript?url=${encodeURIComponent(videoUrl)}`
  );
  return response.json();
};

// Ask GPT to generate an answer for a specific question
export const getAnswer = async (question) => {
  const response = await fetch('http://localhost:5000/api/answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
  return response.json();
};

// Save a question-answer pair to the backend
export const savePair = async (question, answer) => {
  return fetch('http://localhost:5000/api/pair', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, answer }),
  });
};

// Delete a saved question-answer pair by question
export const deletePair = async (question) => {
  return fetch('http://localhost:5000/api/pair', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
};
