import React, { Component } from 'react';
import '../css/searchbar.css';

import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

const API_URL = "http://localhost:8000/";
const LIMIT = 3;  // Max number of search results to load at once.

const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (suggestion) => (<span>{suggestion.name}, {suggestion.postcode}</span>);
const shouldRenderSuggestions = (value) => value.length > 2;

const search = (query, offset=null, limit=null) => {
  let url = `${API_URL}stores?search=${query}`;
  // TODO would be nicer to build querystring properly instead of hard-coding ?, & etc.
  if (offset) {
    url += `&offset=${offset}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  return fetch(url).then(
    res => res.json()
  ).catch((error) => {
    alert("API error\n" + error);
  });
}

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      offset: 0
    };
    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 100);
  }

  componentDidMount() {
    this.props.setLoadMore(() => this.loadResults(this.state.offset, LIMIT, true));
  }

  onChange = (event, { newValue, method }) => {
    this.setState({ value: newValue });
  }

  loadSuggestions(value) {
    search(value).then(
      result => this.setState({ suggestions: result.stores })
    );
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.debouncedLoadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  loadResults = (offset, limit, append=false) => {
    this.props.setIsLoading(true);
    return search(this.state.value, offset, limit).then(data => this.props.setResults(data, append)).then(data =>
      this.setState({offset: offset + data.stores.length})
    ).finally(() =>
      this.props.setIsLoading(false)
    );
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.loadResults(0, LIMIT);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search by store name or postcode…",
      value,
      onChange: this.onChange
    };
    return (
      <form className="store-search" onSubmit={this.onSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={() => this.loadResults(0, LIMIT)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={inputProps}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}
