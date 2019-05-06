import React, { Component } from 'react';
import '../css/searchbar.css';

import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce'

const API_URL = "http://localhost:8000/"

const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (suggestion) => (<span>{suggestion.name}, {suggestion.postcode}</span>);
const shouldRenderSuggestions = (value) => value.length > 2;

export default class SearchBar extends Component {
  constructor({setResults, setIsLoading}) {
    super();
    this.setResults = setResults;
    this.setIsLoading = setIsLoading;
    this.state = {
      value: '',
      suggestions: []
    };
    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 100);
  }

  search(query, offset=null, limit=null) {
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

  onChange = (event, { newValue, method }) => {
    this.setState({ value: newValue });
  }

  loadSuggestions(value) {
    this.search(value).then(
      results => this.setState({ suggestions: results })
    );
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.debouncedLoadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  loadResults = () => {
    this.setIsLoading(true);
    return this.search(this.state.value).then(this.setResults).finally(() => {
      this.setIsLoading(false);
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.loadResults();
  }

  showAll = (event) => {
    this.setState({value: ''}, this.loadResults);
  };

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
          onSuggestionSelected={this.loadResults}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={inputProps}
        />
        <input type="submit" value="Search" />
        <input type="button" value="Show all" onClick={this.showAll} />
      </form>
    );
  }
}
