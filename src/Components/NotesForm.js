import React, { useEffect, useState } from "react";
import "./noteform.css";
import { PlusIcon } from "@heroicons/react/outline";
const NotesForm = ({
  mode = "Add",
  addNote,
  updateNote,
  updatingNoteId,
  noteToBeUpdated,
  cancelUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //Validation error message for title field
  const [titleError, setTitleError] = useState("");
  //Validation error message for Content field
  const [contentError, setContentError] = useState("");

  //Set the field values according to the mode (Add/Update)
  useEffect(() => {
    if (mode == "Update") {
      setTitle(noteToBeUpdated.title);
      setContent(noteToBeUpdated.content);
    } else if (mode == "Add") {
      setTitle("");
      setContent("");
    }
  }, [mode]);

  //Function to validate the fields - title & content returns boolean value
  const validateInput = () => {
    if (title.length == 0) {
      setTitleError("Title cannot be empty");
    }
    if (content.length == 0) {
      setContentError("Content cannot be empty");
    }
    return title.length != 0 && content.length != 0 ? true : false;
  };

  //Function to submit; Based on the mode - Add or Update
  const submit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      if (mode == "Add") {
        addNote(title, content);
        setTitle("");
        setContent("");
      } else updateNote(updatingNoteId, title, content);
    }
  };

  //Update the error message in realtime as the field value changes
  useEffect(() => {
    if (title.length > 0) setTitleError("");
  }, [title]);
  useEffect(() => {
    if (content.length > 0) setContentError("");
  }, [content]);

  return (
    <div className="note-form-container">
      <h1 className="note-form-title">
        {mode == "Add" ? "Add Note" : "Update Note"}
      </h1>
      <form className="note-form">
        <div className="note-field">
          <label>Title</label>
          <div>
            <input
              placeholder="Note Title"
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {titleError.length > 0 ? (
              <p className="error">{titleError}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="note-field">
          <label>Content</label>
          <div>
            <textarea
              value={content}
              placeholder="Note Content"
              type="text-area"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            {contentError.length > 0 ? (
              <p className="error">{contentError}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="note-btns">
          <button
            className="note-add-btn"
            onClick={(e) => {
              submit(e);
            }}
          >
            <PlusIcon className="note-plus-icon" />
            {mode == "Add" ? "Add Note" : "Update Note"}
          </button>
          {mode == "Update" ? (
            <p className="note-update-cancel" onClick={() => cancelUpdate()}>
              cancel
            </p>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default NotesForm;
