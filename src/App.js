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
      canLoadMoreResults: false
    }
  }

  setIsLoading = (isLoading) => {
    this.setState({isLoading});
  }

  setResults = (data, append=false) => {
    if (data) {
      this.setState(prevState => ({
        results: append ? [...prevState.results, ...data.stores] : data.stores,
        canLoadMoreResults: data.anyRemaining
      }));
    }
    return data;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Store locator</h1>
          <SearchBar setIsLoading={this.setIsLoading} setResults={this.setResults} setLoadMore={func => this.loadMoreFunc = func}/>
        </header>
        <SearchResults
          results={this.state.results}
          isLoading={this.state.isLoading}
          canLoadMore={this.state.canLoadMoreResults}
          loadMore={this.loadMoreFunc}
         />
      </div>
    );
  }
}

export default App;
