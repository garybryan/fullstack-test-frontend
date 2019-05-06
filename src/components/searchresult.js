import React from 'react';

export default function SearchResult({ store }) {
	return (
		<li><strong>{store.name}</strong>, {store.postcode}</li>
	);
}