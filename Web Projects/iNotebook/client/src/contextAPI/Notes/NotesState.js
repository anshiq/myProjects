import React, { useState, useEffect } from "react";
import Notecontext from "./NoteContext";
const NoteState = (props) => {
  const [Note, setNote] = useState([]);
  useEffect(() => {
    fetch("http://localhost/api/allnotes", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtAZ21haWwuY29tIiwiaWQiOiI2MzNhODE1M2RlODhlYmVmNGVkODVmNjciLCJpYXQiOjE2NjQ3Nzg1OTZ9.4N0aOMNL_-pZCoR0EaM6vrKXZlKMCKYuA3L0ivnr1-E",
      },
    })
      .then((res) => res.json())
      .then((data) => setNote(data));
    // console.log("notestate wala running");
  }, [Note.length]);

  const addNote = async (props) => {
    const notetoAdd = {
      title: props.title,
      description: props.description,
      tags: props.tags,
    };
    const allnotes = await fetch("http://localhost/api/addnote", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtAZ21haWwuY29tIiwiaWQiOiI2MzNhODE1M2RlODhlYmVmNGVkODVmNjciLCJpYXQiOjE2NjQ3Nzg1OTZ9.4N0aOMNL_-pZCoR0EaM6vrKXZlKMCKYuA3L0ivnr1-E",
      },
      body: JSON.stringify(notetoAdd),
    });
    const newNoteArray = await allnotes.json();
    console.log(newNoteArray.status);
    setNote(Note.concat(newNoteArray));
  };
  const deleteNote = async (props) => {
    console.log(props);
    const allnotes = await fetch(`http://localhost/api/delete/${props}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtAZ21haWwuY29tIiwiaWQiOiI2MzNhODE1M2RlODhlYmVmNGVkODVmNjciLCJpYXQiOjE2NjQ3Nzg1OTZ9.4N0aOMNL_-pZCoR0EaM6vrKXZlKMCKYuA3L0ivnr1-E",
      },
    })
      .then((res) => res.json())
      .then((data) => setNote(Note.filter((item) => item._id == data._id)));
  };

  return (
    <Notecontext.Provider value={{ Note, addNote, deleteNote }}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default NoteState;
