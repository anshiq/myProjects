import React, {useContext} from 'react'
import Notecontext from '../contextAPI/Notes/NoteContext'
export default function About() {
  const a = useContext(Notecontext)
  return (
    <>
    <div>About </div>
    <h1>This Web is  built by {a.name}</h1>
    </>
  )
}
