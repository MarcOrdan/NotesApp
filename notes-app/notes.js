const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'Your Notes...';
};

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
	console.log(chalk.inverse('Your Notes'));

	notes.forEach(note => {
		console.log(note.title);
	});
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
	listNotes: listNotes
};
