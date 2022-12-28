import React from 'react';
import classes from './NoQuotesFound.module.css';

function NoQuotesFound() {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <a className="btn" href="/">
        Add a Quote
      </a>
    </div>
  );
}

export default NoQuotesFound;
