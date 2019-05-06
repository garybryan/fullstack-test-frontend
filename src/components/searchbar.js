import React from 'react';
import '../css/searchbar.css';

export default function SearchBar({ searchFunc, inputRef }) {
	return (
		<form className="store-search" onSubmit={searchFunc}>
			<input ref={inputRef} className="search-input" type="text" placeholder="Search by store name or postcode…" />
			<input type="submit" value="Search" />
		</form>
	);
}
