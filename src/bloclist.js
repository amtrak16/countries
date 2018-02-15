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

class BlocList extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        blocCountriesMsg: '',
        blocCountriesErr: false,
        blocsCountriesExist: false,
        blocCountries: []
      }
    this.getBlocCountries = this.getBlocCountries.bind(this)

  }

  componentDidMount() {
    this.getBlocCountries()
  }

  componentWillReceiveProps() {
    this.getBlocCountries()
  }

  getBlocCountries() {
    // let blocIdx = this.state.blocs.indexOf(this.props.match.params.name)
    // let blocId = this.state.blocs[blocIdx].id
    let apiVal = `https://restcountries.eu/rest/v2/regionalbloc/${this.props.match.params.name}`
    axios.get(apiVal)
      .then((response) => {
        console.log(response.data)
        this.setState({ blocCountries: response.data, blocCountriesExist: true, blocCountriesErr: false, blocCountriesMsg: '' })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ blocCountriesExist: false, blocCountriesErr: true, blocCountriesMsg: 'Failed to get bloc countries.' })
      })
  }

  render() {

    return (
      <div classname="row">
        <h1>{this.props.match.params.name}</h1>
        <div className="small-10 columns">
          {this.state.blocCountries.map((country, idx) => {
            return (
              <div className="card">
                <img id="flag" src={country.flag}></img>
                <li key={idx} id={country.numericCode} className="heading-nav-entry"><span class="label info">Country:</span><NavLink exact to={`/countries/${country.name}`} activeClassName="active" activeStyle={{ padding: '5px', backgroundColor: 'lightgrey', borderRadius: '5px' }}>{country.name}</NavLink></li>
                <p><span class="label info">Capital:</span>{country.capital}</p>
                <p><span class="label info">Population:</span>{country.population}</p>
              </div>
            )
          })
          }
        </div>
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
export default BlocList