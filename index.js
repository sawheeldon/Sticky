/* global $ */
var React = require('react');
var ReactDOM = require('react-dom');
var Note= require('./note.js');

var Board = React.createClass({
      propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is stupid");
            }
        }
    },
    getInitialState: function() {
        return {
            notes: [
               
            ]
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text){
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    },
    update: function(newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});
    },
    remove: function(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    },
    everyNote: function(note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</Note>
            );
    },
    render: function() {
        return (<div className="board">
                    {this.state.notes.map(this.everyNote)}
                    <h1>Sticky</h1>
                    <p id="welcomeText">Welcome to Sticky your note sticking app</p>
                    <ol>
                        <li className="welcomeTextLi">Click the Add button below to add sticky notes</li>
                        <li className="welcomeTextLi">Edit or delete as many notes as you like</li>
                        <li className="welcomeTextLi">You can even drag the notes around...</li>
                    </ol>
                    <button className="btn btn-lg glyphicon glyphicon-plus plusButton" onClick={this.add.bind(null, "Edit Me")}/>
            </div>

        );
    }
});


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Board count={10} />, document.getElementById('board'));
});