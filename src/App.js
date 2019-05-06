import React, { Component } from 'react';
import './css/App.css';

import SearchBar from './components/searchbar'
import SearchResults from './components/searchresults'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
    }
  }

  setIsLoading = (isLoading) => {
    this.setState({isLoading});
  }

  setResults = (results) => {
    this.setState({results});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Store locator</h1>
          <SearchBar setIsLoading={this.setIsLoading} setResults={this.setResults}/>
        </header>
        <SearchResults results={this.state.results} isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default App;
