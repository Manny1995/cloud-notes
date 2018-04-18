import React, { Component } from 'react';
import NoteCard from './NoteCard';
import {getNotesForClass} from '../api';

export default class DetailView extends Component {
  
    constructor() {
      super();
      this.state = {
        loading : true,
        dataSource : [],
      };
    }

    sharedFetch(id) {

      let outerState =  this;

      getNotesForClass(id, function(data) {
        console.log("Printing data");
        console.log(data);

        // call within componentWilLUpdate
        outerState.setState({
          loading : false,
          dataSource : data,
        });
      });   
    }
    
  
    componentWillReceiveProps(nextProps) {
      this.sharedFetch(nextProps.match.params.id);
    }

    componentWillMount() {
      this.sharedFetch(this.props.match.params.id);
    }
    

    render() {

      if (this.state.loading) {
        return <h1>Loading...</h1>
      }

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
                <div className="row">
                </div>
                <br/>
                {detailGrid}
              </div>);
    }
  }