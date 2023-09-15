const yargs = require("yargs");
const notes = require("./notes");

//setting new yargs version
yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "Add new note",
  builder: {
    title: {
      describe: "Notes Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Notes title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

//Create List command
yargs.command({
  command: "list",
  describe: "List a note",
  handler() {
    notes.listNotes();
  },
});

//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Notes Title",
      demandOption: true,
      type: true,
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
