import React, { Component } from 'react';
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
        noteVal: '',
        noteMsg: '',
        noteErr: false,
        noteSbmBtn: true,
        notesExist: false,
        notesSortBy: 'sortByDate',
        notes: []
      }

    this.onBlocIn = this.onBlocIn.bind(this)
    this.onBlocClick = this.onBlocClick.bind(this)
    this.postNote = this.postNote.bind(this)
    this.getNotes = this.getNotes.bind(this)
    this.sortNotes = this.sortNotes.bind(this)
    this.onSortBy = this.onSortBy.bind(this)
    this.onUpVote = this.onUpVote.bind(this)
    this.upVote = this.upVote.bind(this)
  }

  componentDidMount() {
    this.getNotes()
  }

  onBlocIn({ target }) {
    if (target.value.length <= 3) {
      this.setState({ noteVal: target.value, noteErr: true, noteMsg: 'Please enter a note of at least three characters.', noteSbmBtn: true })
    } else {
      this.setState({ noteVal: target.value, noteErr: false, noteMsg: '', noteSbmBtn: false })
    }
  }

  onBlocClick(evt) {
    evt.preventDefault();
    this.postNote({ note: this.state.noteVal, votes: 0 })
  }

  postNote(payload) {
    let apiVal = `http://5a8318ed98bd81001246c8e1.mockapi.io/anonnote/v1/notes`
    axios.post(apiVal, payload)
      .then((response) => {
        this.setState({ noteVal: '', notesSortBy: 'sortByDate' })
        this.getNotes()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ noteVal: this.state.noteVal, noteErr: true, noteMsg: 'Note failed to post, please try again.', noteSbmBtn: true })
      })
  }

  getNotes() {
    let apiVal = `http://5a8318ed98bd81001246c8e1.mockapi.io/anonnote/v1/notes`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ notes: response.data, notesExist: true, noteErr: false, noteMsg: '' })
        this.sortNotes()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ notesExist: false, noteErr: true, noteMsg: 'Failed to get notes.' })
      })
  }

  onSortBy(evt) {
    this.setState({ notesSortBy: evt.target.id })
    this.getNotes()
  }

  sortNotes() {
    let sortedNotes = this.state.notes.slice()
    if (this.state.notesSortBy === 'sortByDate') {
      sortedNotes.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      })
    } else {
      if (this.state.notesSortBy === 'sortByVote') {
        sortedNotes.sort(function (a, b) {
          return b.votes - a.votes;
        })
      }
    }
    this.setState({ notes: sortedNotes })
  }

  onUpVote(evt) {
    evt.preventDefault();
    this.setState({ notesSortBy: 'sortByVote' })
    let upVoteNotes = this.state.notes.slice()
    let newVotes = upVoteNotes[evt.target.id].votes
    newVotes = newVotes + 1
    let curId = upVoteNotes[evt.target.id].id
    this.upVote({ id: curId, votes: newVotes })
  }

  upVote(payload) {
    let apiVal = `http://5a8318ed98bd81001246c8e1.mockapi.io/anonnote/v1/notes/${payload.id}`
    axios.put(apiVal, payload)
      .then((response) => {
        this.setState({ noteErr: false, noteMsg: '' })
        this.getNotes()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ noteErr: true, noteMsg: 'Failed to update note votes.' })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <form onSubmit={this.onBlocClick}>
          <div className="row">
            <div className="small-3 columns">
              <div className="card">
                <div className="row">
                  <div className="small-10 columns md-text-field with-floating-label icon-left">
                  </div>
                </div>
              </div>
            </div>
            <div className="small-9 columns">
              <div className="card">
                <div className="row">
                </div>
              </div>
            </div>
            <input type="button" className="button srtBtn" id="sortByDate" onClick={this.onSortBy} value="Track" />
            {/* <div className="row padding-small">
              <div className="small-12 columns">
                <div className="card">
                  <div className="noteCtn">
                    <table className="table scrollable" summary="This summary is for screen readers and should summarize the structure of the table headers and rows">
                      <caption className="show-for-sr"></caption>
                      <thead>
                        <tr>
                          <th width="50px">Note</th>
                          <th width="50px">Created</th>
                          <th width="50px">Votes</th>
                          <th width="50px"></th>
                        </tr>
                      </thead>
                      <tbody className="tbody">
                        {this.state.notes.map((note, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{note.note}</td>
                              <td>Noted on: </td>
                              <td>{note.votes}</td>
                              <td>
                                <input type="button" className="button srtBtn" id={idx} onClick={this.onUpVote} value="Upvote!" />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </form>
      </div >
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
