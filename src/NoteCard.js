import React from 'react';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js'; 

class NoteCard extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            note: {}
        }
    }

    componentDidMount() {
        this.setState({
            note: this.props.note
        })
    }

    saveChanges(e) {
        e.preventDefault();
        firebaseDatabase.ref(FirebaseConstant.basePath).child(this.state.note.key).update({
            title: this.noteTile.value,
            text: this.noteText.value
        });
    }
    
    render() {
       

        let editingTemplate = (
            <div>
                <h4>{this.state.note.title}</h4>
                <hr />
                <p>{this.state.note.text}</p>
            </div>
        )

        if(this.state.editing) {
            editingTemplate = (
                <div>
                    <form onSubmit={this.saveChanges.bind(this)}>
                        <div>
                            <input type="text" defaultValue={this.state.note.title} name="title" onChange={(e)=>{this.note.title = e.target.value}}/>
                        </div>

                        <div>
                            <input type="text" defaultValue={this.state.note.text} name="text" onChange={(e)=>{this.note.text = e.target.value}}/>
                        </div>
                        <input type="submit" value="Submit Changes" />
                    </form>
                </div>
            )
        }

        return (

            <div className="noteCard">
                <i className="fa fa-edit" onClick={() => this.setState({editing: true})}></i>
                <i className="fa fa-times" onClick={() => this.props.removeNote(this.state.note.key)}></i>
                {editingTemplate}
            </div>
        )
    }
}
export default NoteCard;

