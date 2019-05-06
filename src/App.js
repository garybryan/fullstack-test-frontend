import React from 'react';
import logo from './logo.svg';
import './css/App.css';

import SearchBar from './components/searchbar'
import SearchResults from './components/searchresults'

const TEST_RESULTS = [
  {'name': 'Edinburgh', 'postcode': 'EH8 9BH'},
  {'name': 'Leith', 'postcode': 'EH6 6AY'},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Store locator</h1>
        <SearchBar/>
      </header>
      <SearchResults results={TEST_RESULTS}/>
    </div>
  );
}

export default App;
