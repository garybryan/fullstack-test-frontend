import React from 'react';

import '../css/searchresults.css';
import SearchResult from './searchresult'

export default function SearchResults({results=[]}) {
	return (
		<ul className="search-results">
			{results.map((store, i) => <SearchResult key={i} store={store}/>)}
		</ul>
	);
}