import "./App.css";
import NotesForm from "./Components/NotesForm";
import Notebook from "./Containers/Notebook";
import { useState } from "react";

function App() {
  //collection of notes
  const [notebook, setNotebook] = useState([]);
  //mode can Add - to add new note or Update - to update any current note
  const [mode, setMode] = useState("Add");
  //ID (index) of the note to be updated
  const [updatingNoteId, setUpdatingNoteId] = useState(0);
  //contents of the note to be updated
  const [noteToBeUpdated, setNoteToBeUpdated] = useState();

  //Function to add new note
  const addNote = (title, content) => {
    console.log("Adding new note");
    let newNotebook = [...notebook, { title: title, content: content }];
    console.log("adding new note", newNotebook);
    setNotebook(newNotebook);
  };

  //Function to update the note at index - id in the notebook
  const updateNote = (id, title, content) => {
    console.log("Updating with new changes", id, title, content);
    let updatedNotebook = [...notebook];
    updatedNotebook[id] = {
      title: title,
      content: content,
    };
    setNotebook(updatedNotebook);
    console.log(notebook);
    setMode("Add");
  };

  //Function to trigger update mode for the NoteForm and set the note to be updated
  const updateNoteMode = (id) => {
    console.log("Entering update mode with index ", id);
    setMode("Update");
    setUpdatingNoteId(id);
    setNoteToBeUpdated(notebook[id]);
  };

  //Function to cancel an ongoing update to the note without saving the changes
  const cancelUpdate = () => {
    setMode("Add");
  };
  document.title = "Take Notes";
  return (
    <div className="App">
      <NotesForm
        mode={mode}
        addNote={addNote}
        updateNote={updateNote}
        updatingNoteId={updatingNoteId}
        noteToBeUpdated={noteToBeUpdated}
        cancelUpdate={cancelUpdate}
      />
      <Notebook notebook={notebook} updateNoteMode={updateNoteMode} />
    </div>
  );
}

export default App;
