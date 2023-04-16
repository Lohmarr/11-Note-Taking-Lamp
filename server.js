const express = require('express');
const path = require('path');
const fs = require('fs');
// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET request for notes html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

app.get('/api/notes', (req, res) => {
    res.json(notesData)
  });

app.post('/api/notes')

// Wildcard request for index html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
