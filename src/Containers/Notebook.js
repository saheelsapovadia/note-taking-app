import React from "react";
import Note from "../Components/Note";
import "./notebook.css";
const Notebook = ({ notebook, updateNoteMode }) => {
  return (
    <div>
      {notebook.length > 0 ? (
        <h1 className="notebook-title">My Notebook</h1>
      ) : (
        <></>
      )}
      <div
        className={
          notebook.length % 2 == 0
            ? `notebook-container`
            : `notebook-container notebook-container-odd`
        }
      >
        {notebook.map((note, index) => {
          return (
            <Note
              title={note.title}
              content={note.content}
              updateNoteMode={updateNoteMode}
              id={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notebook;
