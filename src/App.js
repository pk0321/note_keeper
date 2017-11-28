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
    this.toggleSideBar();
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
            {this.state.notes.map((note,i) => {
              return (
                <NoteCard note={note} key={i} />
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
