import React,{useContext} from 'react';
import noteContext from "../contex/notes/NoteContext";
import { useState } from 'react';
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
const AddNotes = (props) => {
    const context = useContext(noteContext);
    const{ addNote }=context;
    const [note, setNote] = useState({title :"",description:"", tag:""})

    const Valid = () =>{
      let isValid = true
      if(note.description.length < 3){
       
      props.showAlert("Description must atleast contain 3 characters ","Warning")
        isValid = false;
      }
      else if (!note.title)
      {
      
        props.showAlert("Title cannot be left empty","Warning")
        isValid = false;
      }
      return isValid
    }
    
    const handleClick = (e) => {
      e.preventDefault();
      const Validation = Valid();
      console.log(Validation)
      if(Validation){
        addNote(note.title, note.description, note.tag);
        setNote({title :"",description:"", tag:""} );
        console.log(note)
        props.showAlert("Note added Successfully ","success");
      }

    
    }
    const handleOnChnage = (e) => {
      setNote({...note, [e.target.name]: e.target.value})


    }
   

    return <div>
             <div className="container my-3">
        <h2> Add a note</h2>
        <form name="myForm"  method="post" required>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">
      <strong>
        Title
        </strong>
        </label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} placeholder='Enter Title' onChange={handleOnChnage}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">
      <strong>
      Description
      </strong></label>
    <textarea type="text" rows="10"  placeholder='Write description...' className="form-control" value={note.description}  id="description" name="description" onChange={handleOnChnage}/>
    <div id="emailHelp" className="form-text">Enter atleast 3 characters.</div>
  </div>
  <div className="mb-3 ">
    <label className="form-label" htmlFor="tag">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={handleOnChnage}/>
  </div>
  <button type="submit" className="btn btn" onClick={handleClick} style={{backgroundColor:"#ff8442",color:"#fff"}}>Add Notes </button>
</form>
</div>
    </div>;
  
}

AddNotes.propTypes = propTypes;
AddNotes.defaultProps = defaultProps;
// #endregion

export default AddNotes;