import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import Blocs from './blocs';
// import Results from './results';
import Countries from './countries'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1 id="title">Countries</h1>
            <ul className="heading-nav">
              <li className="heading-nav-entry"><NavLink exact to="/" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Tracking</NavLink></li>
              {/* <li className="heading-nav-entry"><NavLink exact to="/rankings" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Rankings</NavLink></li> */}
            </ul>
          </header>
          <main>
            <Route exact path="/" component={Blocs} />
            <Route exact path="/:name" component={Blocs} />
            {/* {/* <Route exact path="/results" component={Results} /> */}
            <Route exact path="/countries" component={Countries} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
