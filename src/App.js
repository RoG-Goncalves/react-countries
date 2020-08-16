import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });
    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation: this.calculateTotalPopulationFrom(allCountries),
    });
  }
  calculateTotalPopulationFrom = (countries) => {
    const filteredPopulation = countries.reduce(
      (acc, curr) => acc + curr.population,
      0
    );
    return filteredPopulation;
  };

  handleChangeFilter = (newFilter) => {
    this.setState({
      filter: newFilter,
    });
    const filterLowerCase = newFilter.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) =>
      country.filterName.includes(filterLowerCase)
    );
    this.setState({
      filteredCountries,
      filteredPopulation: this.calculateTotalPopulationFrom(filteredCountries),
    });
  };
  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          populationCount={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
