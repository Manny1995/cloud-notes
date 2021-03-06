import React, { Component } from 'react';
import {Router} from 'react-router';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
// import './App.css';

import DetailView from './Detail';
import MasterView from './Master';

import { getClasses, getNotesForClass } from './api'


class SplashScreen extends Component {

  render() {
    return (<div>
        <h1>This is my Splash screen</h1>
      </div>)
  }
}

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
      outerState.setState({
        loading : false,
        classes : data,
      });
    });
  }

  componentWillMount() {
    this.fetchClasses();
  }
  

  render() {
    
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    let begin = String();
    if (this.state.classes.length > 0) {
      begin = this.state.classes[0].queryTitle;
    }
    
    // For the redirect line, add the this.props.match.params.id as a prop
    return (
      <div className="App">
      
        <MasterView dataSource={this.state.classes} loading={false}/>

        <Switch>
          <Route path={'/:id'} component={DetailView}/> 
          <Redirect from='' to={'/' + begin}/> 
        </Switch>
        
      </div>
    );
  }
}

export default App;
