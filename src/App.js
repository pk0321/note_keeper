import React, { Component } from 'react';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js'; 
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

  componentDidMount() {
    firebaseDatabase.ref(FirebaseConstant.basePath).on('value', (res) => {

      const userData = res.val();
      const dataArray = [];

      for(let key in userData) {
        userData[key].key = key;
        dataArray.push(userData[key])
      }
      this.setState({
        notes: dataArray
      })
    });
  }

  toggleSideBar() {
	  this.setState({displaySidebar: !this.state.displaySidebar});
  }

  addNote(e) {
    e.preventDefault();

    const note = {
      title: this.state.noteTitle,
      text: this.state.noteText
    }

    firebaseDatabase.ref(FirebaseConstant.basePath).push(note); 

    var myNotes = this.state.notes;
    myNotes.push(note);
    
    this.setState({
      notes: myNotes,
	  noteText: '',
	  noteTitle: ''
    });
    
    this.toggleSideBar();
  }

  removeNote(noteId) {
    firebaseDatabase.ref(FirebaseConstant.basePath).child(noteId).remove();
  }

  render() {
	  var myClass = 'sidebar';
	  if (this.state.displaySidebar) {
		myClass = myClass + ' show';  
	  }
	  
    return (
      <div>
          <header className="mainHeader">
            <h1>Note Keeper</h1>
            <nav>
              <a href="" onClick={(e) => {e.preventDefault(); this.toggleSideBar();}}>Add New Note</a>
            </nav>
          </header>
      
          <section className="notes">
            {this.state.notes.map((note, key) => {
              return (
                <NoteCard note = {note} key={key} removeNote={this.removeNote} />
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
