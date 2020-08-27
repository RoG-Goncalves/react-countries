import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setallCountries] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [filteredPopulation, setfilteredPopulation] = useState(0);
  const [filter, setfilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();
      const everyCountry = json.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );
      setallCountries(everyCountry);
      setfilteredCountries(Object.assign([], everyCountry));
      setfilteredPopulation(calculateTotalPopulationFrom(everyCountry));
    };
    fetchData();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const filteredPopulation = countries.reduce(
      (acc, curr) => acc + curr.population,
      0
    );
    return filteredPopulation;
  };

  const handleChangeFilter = (newFilter) => {
    setfilter(newFilter);

    const filterLowerCase = newFilter.toLowerCase();
    const filteredCountries = allCountries.filter((country) =>
      country.filterName.includes(filterLowerCase)
    );
    setfilteredCountries(filteredCountries);
    setfilteredPopulation(calculateTotalPopulationFrom(filteredCountries));
  };
  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        populationCount={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
