import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css'
import { connect } from 'react-redux';
import { postNote } from './state/actions';
import axios from 'axios';

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
      }

  }

  render() {
    return (
      <div>
        <ul>
          <li className="heading-nav-entry"><NavLink exact to={`/`} activeClassName="active" activeStyle={{ padding: '5px', backgroundColor: 'lightgrey', borderRadius: '5px' }}>Home</NavLink></li>
          <li className="heading-nav-entry"><NavLink exact to={`/countries/tracking`} activeClassName="active" activeStyle={{ padding: '5px', backgroundColor: 'lightgrey', borderRadius: '5px' }}>Tracking</NavLink></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    noteSuccess: state.noteSuccess,
    player2Success: state.player2Success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postNote: function (payload) {
      dispatch(postNote(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Countries);
