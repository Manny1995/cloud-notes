import React, { Component } from 'react';
import {Router} from 'react-router';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import './App.css';

import DetailView from './Detail';
import MasterView from './Master';

import { getClasses, getNotesForClass } from './api'

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading : true,
      classes : Array(),
      notes : Array(),
    };
  }

  fetchClasses() {
    const outerState = this;
    getClasses((data) => {
      this.setState({
        loading : false,
        classes : data,
      });
    });
  }

  componentWillMount() {
    console.log("Component mounting")
    this.fetchClasses();
  }

  render() {
    
    console.log("Component Rendering");
    console.log(this.state.classes)


    let begin = null;
    let dsRoutes = this.state.classes.map(obj => {
        
      if (obj.queryTitle == null) {
        obj.queryTitle = "";
      }

      if (begin == null) {
        begin = obj.queryTitle;
      }
  
      return <Route key={obj._id} path={'/'+obj.queryTitle} component={DetailView}/>
  
    });




    console.log("Printing Classes");
    console.log(this.state.classes);

    return (
      <div className="App">
      
        <MasterView dataSource = {this.state.classes} loading={false}/>

        <Switch>
          <Route path={'/:id'} component={DetailView}/>
          <Redirect to={'/' + begin}/>

        </Switch>


      </div>
    );
  }
}

export default App;
