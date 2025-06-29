import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnswer } from '../redux/answerSlice';

function QuestionList({ questions, savedStatus, toggleSavePair }) {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answers.answers);
  const loadingAnswers = useSelector((state) => state.answers.loading);

  return (
    <table className="table table-striped table-dark table-hover mb-4 fs-5">
      <thead>
        <tr>
          <th>#</th>
          <th>Question</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{q.question}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => dispatch(fetchAnswer(q.question))}
                  disabled={loadingAnswers[q.question]}
                >
                  {loadingAnswers[q.question] ? 'Loading...' : 'Get Answer'}
                </button>
              </td>
            </tr>

            {answers[q.question] && (
              <tr>
                <td colSpan="3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong>Answer:</strong> {answers[q.question]}
                    </span>
                    <button
                      className={`btn btn-sm ${
                        savedStatus[q.question] ? 'btn-secondary' : 'btn-warning'
                      }`}
                      onClick={() => toggleSavePair(q.question, answers[q.question])}
                    >
                      {savedStatus[q.question] ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default QuestionList;
