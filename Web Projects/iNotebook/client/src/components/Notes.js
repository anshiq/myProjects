import React, { useContext,useEffect,useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import noteContext from "../contextAPI/Notes/NoteContext";
export default function Notes() {
  const [note, setNote]= useState()
  let i = 0;
  const allNotes = useContext(noteContext).Note;
  const deleteNote = useContext(noteContext).deleteNote;
  const notes = allNotes.map((item) => {
    console.log("map")
    i++;
    return (
      <div className="card " key={i} style={{ width: "18rem", margin: "3rem" }}>
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <div onClick={()=>{deleteNote(item._id)}}>
            <AiOutlineDelete />
          </div>
          <div>
            <AiOutlineEdit />
          </div>
          <p className="card-text">{item.description}</p>
          {/* <a href="/" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    );
  });

  return <>{notes}</>;
}
