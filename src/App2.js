import React, { Component } from 'react';
import ReactDom from 'react-dom';
import NoteCard from "./NoteCard.js"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
    this.showSidebarFunc = this.showSidebarFunc.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  showSidebarFunc(e) {
    e.preventDefault();
    this.showSidebar.classList.toggle("show");
  }

  addNote(e) {
    e.preventDefault();
    //console.log("submitted");
    //console.log(this);

    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };
    const newNotes = Array.from(this.state.notes);
    newNotes.push(note);
    this.setState({
      notes: newNotes
    });

    // Clear the notes and hide sidebar
    this.noteTitle.value = "";
    this.noteText.value = "";
    this.showSidebarFunc(e);
  }


  render() {
    return (
      <div>
          <header className="mainHeader">
            <h1>Noted</h1>
            <nav>
              <a href="" onClick={this.showSidebarFunc}>Add New Note</a>
            </nav>
          </header>
      
          <section className="notes">
            {this.state.notes.map((note,i) => {
              return (
                <NoteCard note={note} key={'note-${i}'} />
              )
            })}
          </section>

          <aside className="sidebar" ref={ref => this.showSidebar = ref}>
            <form onSubmit={this.addNote}>
              <h3>New Note</h3>
              <div className="close-btn" onClick={this.showSidebarFunc}>
                  <i className="fa fa-times"></i>
              </div>
              <label htmlFor="note-title">Title:</label>
              <input type="text" name="note-title" ref = {ref => this.noteTitle = ref}/>
              <label htmlFor="note-text">Text:</label>
              <textarea name="note-text" ref = {ref => this.noteText = ref}></textarea>
              <input type="submit" value="Add New Note" />
            </form>                    
          </aside>
      </div>
    )
  }
}   

export default App;
