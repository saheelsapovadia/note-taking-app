import React from "react";
import "../Containers/notebook.css";
import { PencilAltIcon } from "@heroicons/react/outline";
const Note = ({ id, title, content, updateNoteMode }) => {
  return (
    <div className="note">
      <PencilAltIcon className="note-edit" onClick={() => updateNoteMode(id)} />
      <p className="note-title">{title}</p>
      <p className="note-content">{content}</p>
    </div>
  );
};

export default Note;
