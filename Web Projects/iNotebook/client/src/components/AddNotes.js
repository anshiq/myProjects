import React, {useContext,useState} from "react";
import Notecontext from "../contextAPI/Notes/NoteContext";
export default function AddNotes() {
  const addNotes = useContext(Notecontext)
  const [note,setNote]= useState({
    title: "",
    description: "",
    tags: ""
  })
 const handleSubmit =(event)=>{
event.preventDefault();
addNotes.addNote(note)
setNote({
   title: "",
    description: "",
    tags: ""
})
 }
  const handleChange =(event)=>{
       const { name, value} = event.target;
       setNote(prevData=>({
        ...prevData,
        [name]: value
       }))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
          onChange={handleChange}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Title"
            value={note.title}
          />

        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
          onChange={handleChange}
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={note.description}
          />
        </div>
         <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
          onChange={handleChange}
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            placeholder="tags"
            value={note.tags}
          />
        </div>
 
        <button type="submit"  className="btn btn-primary">
          AddNote
        </button>
      </form>
    </>
  );
}
