// Main React component that acts as the root of the frontend application.
// - Manages state for questions, answers, and saved pairs.
// - Handles form submission and user interactions.
// - Uses child components (QuestionList and SavedPairs) to display data.


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QuestionList from './components/QuestionList';
import SavedPairs from './components/SavedPairs';
import { fetchSavedPairs, getTranscript, getAnswer, savePair, deletePair } from './utils/api';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAnswers, setLoadingAnswers] = useState({});
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [savedPairs, setSavedPairs] = useState([]);
  const [savedStatus, setSavedStatus] = useState({});

  useEffect(() => {
    fetchSavedPairsData();
  }, []);

  const fetchSavedPairsData = async () => {
    try {
      const data = await fetchSavedPairs();
      setSavedPairs(data);
      setSavedStatus(
        data.reduce((acc, pair) => {
          acc[pair.question] = true;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error retrieving saved data:', error.message);
      setError('Failed to load saved pairs.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await getTranscript(inputValue);
      if (data.questions) {
        setQuestions(data.questions);
      } else {
        setError(data.error || 'Invalid data format.');
      }
    } catch (error) {
      console.error('Error fetching transcript:', error.message);
      setError('Failed to fetch transcript.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswerForQuestion = async (question) => {
    setLoadingAnswers((prev) => ({ ...prev, [question]: true }));
    try {
      const data = await getAnswer(question);
      setAnswers((prev) => ({ ...prev, [question]: data.answer }));
    } catch (error) {
      console.error('Error fetching answer:', error.message);
      setError('Failed to fetch answer.');
    } finally {
      setLoadingAnswers((prev) => ({ ...prev, [question]: false }));
    }
  };

  const toggleSavePair = async (question, answer) => {
    if (savedStatus[question]) {
      await deletePair(question);
      fetchSavedPairsData();
    } else {
      await savePair(question, answer);
      fetchSavedPairsData();
    }
  };

  return (
    <div className="container py-4">
      <header>
        <h1 className="text-center mb-4 fs-1">Enter YouTube link:</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="YouTube link"
              className="form-control fs-4"
            />
            <button type="submit" className="btn btn-primary fs-5" disabled={loading}>
              {loading ? 'Loading...' : 'Get questions'}
            </button>
          </div>
        </form>

        {error && <p className="text-danger fs-4">{error}</p>}

        <h2 className="fs-2">Results:</h2>
        <QuestionList
          questions={questions}
          answers={answers}
          loadingAnswers={loadingAnswers}
          fetchAnswer={fetchAnswerForQuestion}
          savedStatus={savedStatus}
          toggleSavePair={toggleSavePair}
        />

        <h2 className="fs-2">Saved pairs:</h2>
        <SavedPairs savedPairs={savedPairs} toggleSavePair={toggleSavePair} />
      </header>
    </div>
  );
}

export default App;
