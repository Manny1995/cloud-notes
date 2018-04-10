import React, { Component } from 'react';
import {Router} from 'react-router';
import {Route, Link} from 'react-router-dom';
import './App.css';

import { getClasses } from './api'


const DetailView = ({ match }) => (
  <div>
  <h1>Detail View</h1>
  <h3>Message with ID {match.params.id}</h3>
  </div>
);


class ClassCard extends React.Component {

  render() {
    return (
      // <li><a className="dark-text" Link to={'/' + this.props.queryTitle}>{this.props.title}</a></li>
      <li><Link className="dark-text" to={'/' + this.props.link}>{this.props.title}</Link></li>

    );
  }
}


class App extends Component {


  constructor() {
    super();
    this.state = {
      loading : true,
      classes : [],
    };
  }

  componentWillMount() {
    console.log("Component mounting")

    let outerState = this;
    getClasses(function(data) {
      console.log(data)
      outerState.setState({
        loading : false,
        classes : data,
      });
    });
  }

  render() {

    if (this.state.loading) {
      return <div></div>;
    }
    
    console.log("Component Rendering");
    console.log(this.state.classes)
    let ds = this.state.classes.map(obj => {

      if (obj.queryTitle == null) {
        obj.queryTitle = "";
      }
      return <ClassCard key={obj._id} link={obj.queryTitle} title={obj.title} />

    });

    let dsRoutes = this.state.classes.map(obj => {

      if (obj.queryTitle == null) {
        obj.queryTitle = "";
      }

      
      return <Route key={obj._id} path={`/:id`} component={DetailView}/>

    });

    console.log(ds);

    return (
      <div className="App">
      <title>Cloud Notes</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" />

      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crossroads/0.12.2/crossroads.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/hasher/1.2.0/hasher.min.js"></script>
      

        <ul id="slide-out" className="sidenav sidenav-fixed grey lighten-5">
          <h3 className="dark-text">Notes</h3>

          {ds}
        </ul>

        {dsRoutes}

        <div>
        {/* <Router>
          <Route path="/:card" component={ClassCard} />
        </Router> */}
        </div>

      </div>
    );
  }
}

export default App;
