import React from 'react'
import AddNotes from './AddNotes'
import Notes from './Notes'
export default function Home() {
  return (
    <>
    <div className="container">

    <AddNotes/>
    <Notes/>
    </div>
    </>
  )
}
