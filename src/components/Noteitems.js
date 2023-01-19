import React from 'react';
import noteContext from "../contex/notes/NoteContext";
import {useContext} from 'react';
// import Notes from './Notes';
// import styled from 'styled-components';
//  import PropTypes from 'prop-types';

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
const Noteitems = (props) => {
  const context = useContext(noteContext);
  const{ removeNote }=context;
    const{note,updateNotes}=props;
    return (<div className='col-md-3'>
        <div className="card my-3" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
    <p className="card-text">{note.description}</p> 
    <i className="fa-solid fa-trash mx-3" onClick={()=>{removeNote(note._id);
    props.showAlert("Deleted Successfully","success");}}></i>
    <i className="fa-solid fa-file-pen mx-3" onClick={()=>{updateNotes(note)
   }}></i>
    
  </div>
</div>
        
    </div>);
}

Noteitems.propTypes = propTypes;
Noteitems.defaultProps = defaultProps;
// #endregion

export default Noteitems;