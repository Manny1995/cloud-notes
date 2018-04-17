import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom';

export default class ClassCard extends React.Component {
    
    onSelected() {
      this.props.handler(this.props.title);
    }

    
    componentDidUpdate(prevProps, prevState) {
      console.log("Link is " + this.props.link)

    }
    

    render() {
      return (
        // <li className="dark-text">{this.props.title}</li>
        <li><Link className="dark-text waves-effect" to={'/' + this.props.link}>{this.props.title}</Link></li>

      );
    }
  }