import React from 'react';

function SavedPairs({ savedPairs, toggleSavePair }) {
  return (
    <table className="table table-striped table-dark table-hover fs-5">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {savedPairs.map((pair, index) => (
          <tr key={index}>
            <td>{pair.question}</td>
            <td>{pair.answer}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => toggleSavePair(pair.question, pair.answer)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SavedPairs;
