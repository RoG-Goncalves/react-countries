import React, { Component } from 'react';
import css from './countries.module.css';
export default class Country extends Component {
  render() {
    const { flag, name } = this.props.country;
    return (
      <div className={`${css.country} ${css.border}`}>
        <img className={css.avatar} src={flag} alt={name} />
        <span className={css.countryName}>{name}</span>
      </div>
    );
  }
}
