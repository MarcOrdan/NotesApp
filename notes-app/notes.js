const fs = require('fs');
const chalk = require('chalk');

// Adding Notes
const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added.'));
  } else {
    console.log(chalk.red.inverse('Note title taken.'));
  }
};

// Remove Notes
const removeNotes = title => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse('Note Removed!'));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

// List Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your Notes'));

  notes.forEach(note => {
    console.log(note.title);
  });
};

// Read Note
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse.gray(note.title));
    console.log(chalk.inverse.blue(note.body));
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote
};
