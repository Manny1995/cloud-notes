import React, { Component } from 'react';
import NoteCard from './NoteCard';
import {getNotesForClass} from '../api';

export default class DetailView extends Component {
  
    constructor() {
      super();
      this.state = {
        loading : true,
        dataSource : [],
        prevId : "",
      };
    }
  
    componentWillReceiveProps(nextProps) {

      console.log("about to update detail view");
      console.log("Detail view Mounting");

      let outerState =  this;

      getNotesForClass(nextProps.match.params.id, function(data) {
        console.log("Printing data");
        console.log(data);

        // call within componentWilLUpdate
        outerState.setState({
          loading : false,
          dataSource : data,
        });
      });   
    }

  
    render() {

      console.log("Rendering Detail View " + this.props.match.params.id);
      if (this.state.loading) {
        console.log("still loading notes");
        return <h1>Loading...</h1>
      }

      console.log("Component rendering detail view");
      console.log(this.state.dataSource.length);

      var formattedDS = [];

      var dsCopy = this.state.dataSource;
      

      function splitArray(array, part) {
        let tmp = [];
        for(let i = 0; i < array.length; i += part) {
            tmp.push(array.slice(i, i + part));
        }
        return tmp;
      }

      var formattedDS = splitArray(dsCopy, 4);
      console.log("Formatted ds");
      console.log(formattedDS);

      var detailGrid = formattedDS.map((rowArr) => {

        var innerArr = rowArr.map((note) => {
          return <NoteCard title={note.title} link={note.filepath} />
        });

        return <div className="row">
          <div className="col s12 m3">
          </div>
          {innerArr}
        </div>
      });

      let df = this.state.dataSource.map(note => {
        return <NoteCard title={note.title} link={note.link} />
      });
  
      return  (<div>
                <h3 className="page-title">{this.props.match.params.id}</h3>

          {/* <nav className="top-nav">
            <div className="container">
              <div className="nav-wrapper">
                <h3 className="page-title">{this.props.match.params.id}</h3>
              </div>
            </div>
          </nav> */}
          <br/>
        
          {detailGrid}
          </div>);
    }
  }