import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import QuestionList from './components/QuestionList';
import SavedPairs from './components/SavedPairs';

import { setUrl, fetchQuestions } from './redux/videoSlice';
import { loadSavedPairs, addPair, removePair } from './redux/savedSlice';

function App() {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.video.url);
  const questions = useSelector((state) => state.video.questions);
  const loading = useSelector((state) => state.video.loading);
  const error = useSelector((state) => state.video.error);

  const savedPairs = useSelector((state) => state.saved.pairs);
  const savedStatus = useSelector((state) => state.saved.statusMap);

  React.useEffect(() => {
    dispatch(loadSavedPairs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchQuestions(url));
  };

  const toggleSavePair = (question, answer) => {
    if (savedStatus[question]) {
      dispatch(removePair(question));
    } else {
      dispatch(addPair({ question, answer }));
    }
  };

  return (
    <div className="container py-4 bg-dark text-light min-vh-100">
      <header>
        <h1 className="text-center mb-4 fs-1 text-light">Enter YouTube link:</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(e) => dispatch(setUrl(e.target.value))}
              placeholder="YouTube link"
              className="form-control bg-secondary text-light fs-4 border-0"
            />
            <button
              type="submit"
              className="btn btn-primary fs-5"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get questions'}
            </button>
          </div>
        </form>

        {error && <p className="text-danger fs-4">{error}</p>}

        <h2 className="fs-2 text-light">Results:</h2>
        <QuestionList
          questions={questions}
          savedStatus={savedStatus}
          toggleSavePair={toggleSavePair}
        />

        <h2 className="fs-2 text-light">Saved pairs:</h2>
        <SavedPairs savedPairs={savedPairs} toggleSavePair={toggleSavePair} />
      </header>
    </div>
  );
}

export default App;
