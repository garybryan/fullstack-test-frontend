import React, { Component } from 'react';
import './css/App.css';

import SearchBar from './components/searchbar'
import SearchResults from './components/searchresults'

const TEST_RESULTS = [
  {'name': 'Edinburgh', 'postcode': 'EH8 9BH'},
  {'name': 'Leith', 'postcode': 'EH6 6AY'},
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
    this.searchInput = React.createRef('input');
  }
  search = (event) => {
    const query = this.searchInput.current.value;
    event.preventDefault();
    const results = TEST_RESULTS
    this.setState({results});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Store locator</h1>
          <SearchBar searchFunc={this.search} inputRef={this.searchInput}/>
        </header>
        <SearchResults results={this.state.results}/>
      </div>
    );
  }
}

export default App;
