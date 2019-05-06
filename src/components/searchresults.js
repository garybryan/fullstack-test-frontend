import React from 'react';

import '../css/searchresults.css';
import SearchResult from './searchresult'

export default function SearchResults({results=[], isLoading=false}) {
  if (isLoading) {
    return (<p>Loading...</p>);
  } else if (results.length === 0) {
    return (<p>No results to display.</p>);
  }
  return (
    <ul className="search-results">
      {results.map((store, i) => <SearchResult key={i} store={store}/>)}
    </ul>
  );
}