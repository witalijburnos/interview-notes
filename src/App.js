// App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import QuestionList from './components/QuestionList';
import SavedPairs from './components/SavedPairs';

import { setUrl, fetchQuestions } from './redux/videoSlice';
import {
  fetchSavedPairs,
  getAnswer,
  savePair,
  deletePair,
} from './utils/api';

function App() {
  const dispatch = useDispatch();

  // Подключаем Redux-состояние
  const url = useSelector((state) => state.video.url);
  const questions = useSelector((state) => state.video.questions);
  const loading = useSelector((state) => state.video.loading);
  const error = useSelector((state) => state.video.error);

  // Эти состояния пока останутся локальными
  const [loadingAnswers, setLoadingAnswers] = React.useState({});
  const [answers, setAnswers] = React.useState({});
  const [savedPairs, setSavedPairs] = React.useState([]);
  const [savedStatus, setSavedStatus] = React.useState({});

  // Загрузка сохранённых пар при первом рендере
  React.useEffect(() => {
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
    } catch (err) {
      console.error('Error retrieving saved data:', err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchQuestions(url));
  };

  const fetchAnswerForQuestion = async (question) => {
    setLoadingAnswers((prev) => ({ ...prev, [question]: true }));
    try {
      const data = await getAnswer(question);
      setAnswers((prev) => ({ ...prev, [question]: data.answer }));
    } catch (err) {
      console.error('Error fetching answer:', err.message);
    } finally {
      setLoadingAnswers((prev) => ({ ...prev, [question]: false }));
    }
  };

  const toggleSavePair = async (question, answer) => {
    if (savedStatus[question]) {
      await deletePair(question);
    } else {
      await savePair(question, answer);
    }
    fetchSavedPairsData(); // Обновим список после изменения
  };

  return (
    <div className="container py-4">
      <header>
        <h1 className="text-center mb-4 fs-1">Enter YouTube link:</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(e) => dispatch(setUrl(e.target.value))}
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
