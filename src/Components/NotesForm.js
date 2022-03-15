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
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  useEffect(() => {
    if (mode == "Update") {
      setTitle(noteToBeUpdated.title);
      setContent(noteToBeUpdated.content);
    } else if (mode == "Add") {
      setTitle("");
      setContent("");
    }
  }, [mode]);
  const [alertText, setAlertText] = useState("");

  const validateInput = () => {
    let Title = false;
    let Content = false;
    let alertMessage = "";
    if (title.length == 0) Title = true;
    if (content.length == 0) Content = true;
    if (Title && !Content) {
      setTitleError("Title cannot be empty");
      alertMessage = "Title";
      // alert(`${alertMessage}` + ` cannot be empty!`);
    } else if (!Title && Content) {
      alertMessage = "Content";
      setContentError("Content cannot be empty");
      // alert(`${alertMessage}` + ` cannot be empty!`);
    } else if (Title && Content) {
      alertMessage = "Title and Content";
      setTitleError("Title cannot be empty");
      setContentError("Content cannot be empty");
      // alert(`${alertMessage}` + ` cannot be empty!`);
    }

    return !Title && !Content ? true : false;
  };

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

  useEffect(() => {
    if (title.length > 0) setTitleError("");
  }, [title]);
  useEffect(() => {
    if (content.length > 0) setContentError("");
  }, [content]);
  return (
    <div className="note-form-container">
      {mode == "Add" ? (
        <h1 className="note-form-title">Add Note</h1>
      ) : (
        <h1 className="note-form-title">Update Note</h1>
      )}

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
