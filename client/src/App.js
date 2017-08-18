import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Header from './components/Footer';
import Header from './components/Home';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      user: null,
      currentPage: none,
      currentMovieId: null,
      movieData: null,
    }
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
        return <MoviesList movieData={this.state.movieData} />; 
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
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header setPage={this.setPage} />
        {this.decideWhichPage()}
        <Footer />
      </div>
    );
  }
}

export default App;
