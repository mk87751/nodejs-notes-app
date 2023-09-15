const chalk = require("chalk");
const fs = require("fs");

const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.find((note) => note.title === title);
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added"));
  } else {
    console.log(chalk.red("Title taken!"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  if (notes.length === 0) return console.log(chalk.red.bold.inverse("No Data"));
  const remainingNote = notes.filter((note) => note.title !== title);
  if (notes.length > remainingNote.length) {
    saveNotes(remainingNote);
    console.log(chalk.green.bold("Note with title '" + title + "' removed"));
  } else {
    console.log(chalk.red.bold("Notes with title '" + title + "' Not Exist"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bold.blue("Your Notes"));
  notes.forEach((element) => {
    console.log(chalk.bold.green(element.title));
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.bold(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.bold.red.inverse("Note Not Found!"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
