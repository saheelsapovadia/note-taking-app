import "./App.css";
import NotesForm from "./Components/NotesForm";
import Notebook from "./Containers/Notebook";
import { useState } from "react";

function App() {
  const [notebook, setNotebook] = useState([]);
  const [mode, setMode] = useState("Add");
  const [updatingNoteId, setUpdatingNoteId] = useState(0);
  const [noteToBeUpdated, setNoteToBeUpdated] = useState();
  const addNote = (title, content) => {
    console.log("Adding new note");
    let newNotebook = [...notebook, { title: title, content: content }];
    console.log("adding new note", newNotebook);
    setNotebook(newNotebook);
  };

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
  const updateNoteMode = (id) => {
    console.log("Entering update mode with index ", id);
    setMode("Update");
    setUpdatingNoteId(id);
    setNoteToBeUpdated(notebook[id]);
  };
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
