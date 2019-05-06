import React, { Component, Fragment } from 'react';

import '../css/searchresults.css';
import SearchResult from './searchresult'

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    window.onscroll = () => {
      if (
        !this.props.isLoading
        && this.props.canLoadMore
        && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        this.props.loadMore();
      }
    };
  }

  loadMoreClick = (event) => {
    event.preventDefault();
    this.props.loadMore();
  }

  render() {
    if (this.props.results.length === 0) {
      return (<p>No results to display.</p>);
    }

    return (
      <Fragment>
        <ul className="search-results">
          {this.props.results.map((store, i) => <SearchResult key={i} store={store}/>)}
        </ul>
        {this.props.canLoadMore && !this.props.isLoading && <a href="#" onClick={this.loadMoreClick}>Load more stores</a>}
        {this.props.isLoading && (<p>Loading...</p>)}
      </Fragment>
    );
  }
}