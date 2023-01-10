import React from 'react';
import styles from './Searchbar.module.css';

const Searchbar = props => {
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={props.onSubmit}>
        <input
          className={styles.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={props.searchTerm}
          onChange={props.onChange}
        />
        <button className={styles.searchFormButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
