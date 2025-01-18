// React component for displaying a list of extracted questions and their corresponding actions.
// - Shows buttons for fetching answers and saving pairs.

import React from 'react';

function QuestionList({ questions, answers, loadingAnswers, fetchAnswer, savedStatus, toggleSavePair }) {
  return (
    <table className="table table-striped table-hover mb-4 fs-4">
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
                  className="btn btn-success fs-5"
                  onClick={() => fetchAnswer(q.question)}
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
                    <span className="text-dark fs-5">
                      <strong>Answer:</strong> {answers[q.question]}
                    </span>
                    <button
                      className={`btn ${
                        savedStatus[q.question] ? 'btn-secondary' : 'btn-warning'
                      } fs-5`}
                      onClick={() => toggleSavePair(q.question, answers[q.question])}
                    >
                      {savedStatus[q.question] ? 'SAVED' : 'SAVE'}
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
