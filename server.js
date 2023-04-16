const express = require('express');
const path = require('path');
const fs = require('fs');
// Package to generate unique ids
const { v4: uuidv4 } = require('uuid');
// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');

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

// Get request for note data from db.json
app.get('/api/notes', (req, res) => {
    res.json(notesData)
  });

// POST request to add a new note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    // Generate a unique id for the new note using the uuid package
    const newId = uuidv4();
    const newNote = {
      id: newId,
      title,
      text,
    };
  
    // Add the new note to the notesData array
    notesData.push(newNote);
  
    // Write the updated notesData array back to the db.json file
    fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving note');
      } else {
        // Return the new note as the response to the client
        res.json(newNote);
      }
    });
  });

// Wildcard request for index html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
