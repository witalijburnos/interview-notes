// Utility file for making API calls from the frontend to the backend.
// - Includes functions for all server routes:
//   - fetchSavedPairs: GET /api/pair
//   - getTranscript: GET /api/transcript
//   - getAnswer: POST /api/answer
//   - savePair: POST /api/pair
//   - deletePair: DELETE /api/pair


export const fetchSavedPairs = async () => {
    const response = await fetch('http://localhost:5000/api/pair');
    return response.json();
  };
  
  export const getTranscript = async (inputValue) => {
    const response = await fetch(
      `http://localhost:5000/api/transcript?url=${encodeURIComponent(inputValue)}`
    );
    return response.json();
  };
  
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
  
  export const savePair = async (question, answer) => {
    return fetch('http://localhost:5000/api/pair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer }),
    });
  };
  
  export const deletePair = async (question) => {
    return fetch('http://localhost:5000/api/pair', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
  };
  