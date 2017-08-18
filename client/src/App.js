import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';

import MoviesList from './components/MoviesList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
      currentMovieId: null,
      movieData: null,
    }
    this.setPage = this.setPage.bind(this);
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);
    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);
    this.selectEditedMovie = this.selectEditedMovie.bind(this);
  }

  setPage = page => {
    console.log('click');
    this.setState({
      currentPage: page,
    });
  }

  decideWhichPage() {
    switch(this.state.currentPage) {
      case 'home':
        return <Home />
        break;
      case ('movies'):
        return <MoviesList
        movieData={this.state.movieData} 
        handleMovieSubmit={this.handleMovieSubmit}
        handleMovieEditSubmit={this.handleMovieEditSubmit}
        selectEditedMovie={this.selectEditedMovie}
        currentMovieId={this.state.currentMovieId} />;
        break;
        default:
        break;
    }
  }

  handleMovieSubmit (e, title, description, genre) {
    e.preventDefault();
    axios.post('/movies', {
      title,
      description,
      genre,
    }).then(res => {
      this.resetMovies();
    }).catch(err => {
      console.log(err);
    })
  }

  selectEditedMovie(id) {
    this.setState({
      currentMovieId: id,
    })
  }

  handleMovieEditSubmit (e, title, description, genre) {
    e.preventDefault();
    axios.put(`/movies/${this.state.currentMovieId}`, {
      title,
      description,
      genre,
    }).then(res => {
      this.resetMovies();
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    axios.get('/movies')
    .then(res => {
      this.setState({
        movieData: res.data.data,
      })
    })
  }

  resetMovies () {
    axios.get('/movies')
    .then(res => {
      this.setState({
        movieData: res.data.data,
        currentMovieId: null,
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header setPage={this.setPage} logout={this.logout} />
        {this.decideWhichPage()}
        <Footer />
      </div>
    );
  }
}

export default App;
