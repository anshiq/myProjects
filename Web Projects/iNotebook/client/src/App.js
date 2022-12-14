import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contextAPI/Notes/NotesState";
export default function App() {
  return (
    <>
    <NoteState>

      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </NoteState>
    </>
  );
}
