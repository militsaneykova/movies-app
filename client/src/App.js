import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Header from './components/Footer';
import Header from './components/Home';

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
      default:
        break;
    }
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
