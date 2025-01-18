// Utility functions for interacting with a local JSON file for saving data.
// - Handles initialization, reading, writing, and deleting question-answer pairs from the file.
// - DATA_FILE: Path to the JSON file storing saved pairs.


const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

// Инициализация файла, если он не существует
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const getSavedPairs = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

const savePair = (question, answer) => {
  const data = getSavedPairs();
  data.push({ question, answer });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const deletePair = (question) => {
  const data = getSavedPairs();
  const updatedData = data.filter((pair) => pair.question !== question);
  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
};

module.exports = {
  getSavedPairs,
  savePair,
  deletePair,
};
