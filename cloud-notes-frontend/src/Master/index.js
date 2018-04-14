import React, { Component } from 'react';
import ClassCard from './ClassCard';

export default class MasterView extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataSource: Array(),
    };
  }

  
  render() {
    console.log("Master View is rendering");
    let ds = null;

    if (this.props.loading == true) {
      ds = <h2>Loading...</h2>;
    } else {
        ds = this.props.dataSource.map(obj => {
            console.log(obj);
        if (obj.queryTitle == null) {
          obj.queryTitle = "";
        }
        return (
        //   <ClassCard key={obj._id} link={obj.queryTitle} title={obj.title} />
            <ClassCard key={obj._id} link={obj.queryTitle} title={obj.title} />
        );
      });
    }

    return (
      <div>
        <ul id="slide-out" className="sidenav sidenav-fixed grey lighten-5">
          <h3 className="dark-text">Notes</h3>
          {ds}
        </ul>
      </div>
    );
  }
}
