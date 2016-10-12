/* global $ */
var React = require('react');
var ReactDOM = require('react-dom');


var Note = React.createClass({
    getInitialState:function(){
      return {editing: false}  
    },
    edit: function() {
      this.setState({editing:true})
    },
    save: function(){
      this.setState({editing:false})
    },
    remove: function(){
      alert('remove note');  
    },
    renderDisplay: function(){
        return(
            <div className="note">
            <button onClick={this.edit} className="btn btn-success glyphicon glyphicon-pencil"/>
            <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-remove"/>
            </div>
            
            );
    },
    renderForm: function(){
        return(
            <div className="note">
            <textarea className="form-control"> </textarea>
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









document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Note />, document.getElementById('test'));
});