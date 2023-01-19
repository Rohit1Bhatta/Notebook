import React from "react";
import noteContext from "./NoteContext";
// import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesIntial = [
    
  ];
  const [notes, setNotes] = React.useState(notesIntial);
   // Get all notes
   const getAllNotes = async () => {
    // API to Add Note
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        token:
           localStorage.getItem("token"),
        },

      }
    ); 
    const jsonNotes = await response.json();
      console.log(jsonNotes);
      setNotes(jsonNotes);
      

};

  

  // Add a note
  const addNote = async (title, description, tag) => {
      // API to Add Note
      const response = await fetch(
        `${host}/api/notes/newnote`,
  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token:
              localStorage.getItem("token")
          },
  
          body: JSON.stringify({
            title,
            description,
            tag
          }),
        }
      ); const json = await response.json();
      console.log(json);
      
        
    console.log("Adding a Note");
    const note = json;
    setNotes(notes.concat(note));
  };

  // Remove a note
  const removeNote = async(id) => {
    // API CALL TO remove a note
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token:
           localStorage.getItem("token"),
        },

        body: JSON.stringify({
          id
         
        }),
      }
    );
    // const json = await response.json();
    // console.log(JSON.stringify(json));
    console.log("Removing a Note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API to call
    const response = await fetch(
      `${host}/api/notes/updateNote/${id}`,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token:
           localStorage.getItem("token"),
        },

        body: JSON.stringify({
          id,
          title,
          description,
          tag
        }),
      }
    );
     const json = await response.json();
     console.log(JSON.stringify(json));

  // Logic to Edit
  for (let index = 0; index < notes.length; index++) {
   const element =  [index];
    if (element._id === id) {
      
        element.title = title;
        element.description = description;
        element.tag = tag;
      
    }
 
  }
  getAllNotes();
}

  return (
    <noteContext.Provider value={{ notes, addNote, removeNote, editNote ,getAllNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
