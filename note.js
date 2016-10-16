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
    componentDidMount: function(){
        $(ReactDOM.findDOMNode(this)).draggable(); 
        
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
      this.setState({editing:true});
    },
    save: function(){
        this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index);
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
            <textarea ref="newText" value={this.props.children.bind} 
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

module.exports = Note;