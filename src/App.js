import React, { Component } from 'react';
import NoteCard from "./NoteCard.js"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
	  noteText: '',
	  noteTitle: '',
	  displaySidebar: ''
    }
  }
  
  toggleSideBar() {
	  this.setState({displaySidebar: !this.state.displaySidebar});
  }

  addNote(e) {
    e.preventDefault();
    var myNotes = this.state.notes;
	myNotes.push({text: this.state.noteText, title: this.state.noteTitle});
    this.setState({
      notes: myNotes,
	  noteText: '',
	  noteTitle: ''
    });
<<<<<<< HEAD

    // Clear the notes and hide sidebar
    this.noteTitle.value = "";
    this.noteText.value = "";
    //this.showSidebar.classList.toggle("show");
    this.showSidebar();
=======
    this.toggleSideBar();
>>>>>>> ba35ba16f1ea638101c3c16d858e0a9100a4d8c7
  }


  render() {
	  var myClass = 'sidebar';
	  if (this.state.displaySidebar) {
		myClass = myClass + ' show';  
	  }
	  
    return (
      <div>
          <header className="mainHeader">
            <h1>Noted</h1>
            <nav>
              <a href="" onClick={(e) => {e.preventDefault(); this.toggleSideBar();}}>Add New Note</a>
            </nav>
          </header>
      
          <section className="notes">
            {this.state.notes.map((note, key) => {
              return (
<<<<<<< HEAD
                <NoteCard note={note} key={key} />
=======
                <NoteCard note={note} key={i} />
>>>>>>> ba35ba16f1ea638101c3c16d858e0a9100a4d8c7
              )
            })}
          </section>

          <aside className={myClass}>
            <form onSubmit={this.addNote.bind(this)}>
              <h3>New Note</h3>
              <div className="close-btn" onClick={() => this.toggleSideBar()}>
                  <i className="fa fa-times"></i>
              </div>
              <label htmlFor="note-title">Title:</label>
              <input type="text" name="note-title" value={this.state.noteTitle} onChange={(e)=>{this.setState({noteTitle: e.target.value})}}/>
              <label htmlFor="note-text">Text:</label>
              <textarea name="note-text" value={this.state.noteText} onChange={(e)=>{this.setState({noteText: e.target.value})}}></textarea>
              <input type="submit" value="Add New Note" />
            </form>                    
          </aside>
      </div>
    )
  }
}   

export default App;
