import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import Blocs from './blocs';
import BlocList from './bloclist';
import Country from './country'
import Countries from './countries'
import Tracking from './tracking'
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1 id="title">Countries</h1>
          </header>
          <div className="row">
            <div className="small-2 columns">
              <div className="card">
                <Switch>
                  <Route path="/countries/" component={Countries} />
                  <Route path="/" component={Blocs} />
                </Switch>
              </div>
            </div>
            <div className="small-10 columns">
              {/* <div className="card"> */}
              <main>
                <Switch>
                  <Route exact path="/:name" component={BlocList} />
                  <Route exact path="/countries/tracking" component={Tracking} />
                  <Route exact path="/countries/:name" component={Country} />
                </Switch>
              </main>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
