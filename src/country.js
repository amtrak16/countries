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

class Country extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
      }

  }

  render() {
    return (
          <div className="card">
            <h1>{this.props.match.params.name}</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Country);
