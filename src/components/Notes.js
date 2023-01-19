import React from "react";
import noteContext from "../contex/notes/NoteContext";
import { useContext, useEffect, useRef, useState } from "react";
import Noteitems from "./Noteitems";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes,editNote } = context;
  const [note, setNote] = useState({id:"" , etitle: "", edescription: "", etag: "" });
  let navigate =useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      getAllNotes();

    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
  };
  const ref = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Updated Successfully","success");
  };
  const handleOnChnage = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    
  };
  return (
    <div>
      <AddNotes showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={handleOnChnage}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows="10"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={handleOnChnage}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="form-label" htmlFor="etag">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleOnChnage}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
              >
      
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes </h2>
        <div className="conatiner mx-1">
        {notes.length===0 && "No Notes To Display "}
        </div>
        {notes.map((Notes) => {
          return (
            <Noteitems key={Notes._id} updateNotes={updateNotes} showAlert={props.showAlert} note={Notes} />
          );
        })}
      </div>
    </div>
  );
};

Notes.propTypes = propTypes;
Notes.defaultProps = defaultProps;
// #endregion

export default Notes;
