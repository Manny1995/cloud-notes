import React, { Component } from 'react'

export default class NoteCard extends React.Component {

    constructor() {
      super();
      
    };
  
  
    render() {
  
      return (<div className="col s12 m2">
        <div className="card grey lighten-5">
          <div className="card-content dark-text">
            <span className="card-title">{this.props.title}</span>
          </div>
          <div className="card-action">
            <a href={this.props.link}>View</a>
          </div>
        </div>
      </div>)
    }
  
  }
    