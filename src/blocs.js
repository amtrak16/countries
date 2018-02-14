import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css'
import { connect } from 'react-redux';
// import { postbloc } from './state/actions';
import axios from 'axios';

class Blocs extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        blocMsg: '',
        blocErr: false,
        blocsExist: false,
        blocs: []
      }

    this.getBlocs = this.getBlocs.bind(this)
  }

  componentDidMount() {
    this.getBlocs()
  }

  getBlocs() {
    let apiVal = `http://5a846ad43015220012486be5.mockapi.io/countries/blocs`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ blocs: response.data, blocsExist: true, blocErr: false, blocMsg: '' })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ blocsExist: false, blocErr: true, blocMsg: 'Failed to get regional blocs.' })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        {this.state.blocsExist &&
          <form onSubmit={this.onBlocClick}>
            <div className="row">
              <div className="small-2 columns">
                <div className="card">
                  <div className="row">
                        {this.state.blocs.map((bloc, idx) => {
                          return (
                            <ul key={bloc.id}>
                              <li id="blocDtls" className="heading-nav-entry"><NavLink exact to={`/${bloc.name}`} activeClassName="active" activeStyle={{ padding: '5px', backgroundColor: 'lightgrey', borderRadius: '5px' }}>{bloc.name}</NavLink></li>
                            </ul>
                          )
                        })}
                  </div>
                </div>
              </div>
              <div className="small-10 columns">
              </div>
            </div>
          </form>
        }
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     blocSuccess: state.blocSuccess,
//     player2Success: state.player2Success,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     postbloc: function (payload) {
//       dispatch(postbloc(payload))
//     },
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Blocs);
export default Blocs