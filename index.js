/* global $ */
var React = require('react');
var ReactDOM = require('react-dom');


var Note = React.createClass({
    getInitialState:function(){
      return {editing: false};  
    },
    componentWillMount: function() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 200) + 'px',
            top: this.randomBetween(0, window.innerHeight - 200) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
      this.setState({editing:true});
    },
    save: function(){
        this.props.onChange(this.refs.newText.ReactDOMgetDOMNode().value, this.props.index);
        this.setState({editing:false});
    },
    remove: function(){
     this.props.onRemove(this.props.index);
    },
    renderDisplay: function(){
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                <button onClick={this.edit} 
                    className="btn btn-success glyphicon glyphicon-pencil"/>
                <button onClick={this.remove} 
                    className="btn btn-danger glyphicon glyphicon-remove"/>
                </span>    
            </div>
            
            );
    },
    renderForm: function(){
        return(
            <div className="note">
            <textarea ref="newText" value={this.props.children} 
                className="form-control"> </textarea>
                <button onClick={this.save} className=" btn btn-primary glyphicon glyphicon-ok" />
            </div>
            );
    },
    render: function(){
        if(this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});



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
                    <button className="btn btn-lg btn-warning glyphicon glyphicon-plus" onClick={this.add.bind(null, "Edit Me")}/>
            </div>

        );
    }
});







document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Board count={10} />, document.getElementById('test'));
});