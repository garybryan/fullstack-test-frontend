import React, { Component } from 'react';
import './css/App.css';

import SearchBar from './components/searchbar'
import SearchResults from './components/searchresults'

const API_URL = "http://localhost:8000/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false
    }
    this.searchInput = React.createRef('input');
  }
  search = (event) => {
    const query = this.searchInput.current.value;

    event.preventDefault();
    this.setState({isLoading: true});

    fetch(`${API_URL}stores?search=${query}`).then(
      res => res.json()
    ).then((results) => {
      this.setState({results});
    }).catch((error) => {
      alert("API error\n" + error);
    }).finally(() => {
      this.setState({isLoading: false});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Store locator</h1>
          <SearchBar searchFunc={this.search} inputRef={this.searchInput}/>
        </header>
        <SearchResults results={this.state.results} isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default App;
