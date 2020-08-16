import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    this.props.onChangeFilter(event.target.value);
  };
  render() {
    const { filter, countryCount, populationCount } = this.props;
    return (
      <div className={css.flexRow}>
        <label>
          Pesquisar por países
          <input type="text" value={filter} onChange={this.handleInputChange} />
        </label>
        <span className={css.tableInfo}>
          Países:<strong>{countryCount}</strong>
        </span>{' '}
        |
        <span className={css.tableInfo}>
          População:<strong>{formatNumber(populationCount)}</strong>
        </span>
      </div>
    );
  }
}
