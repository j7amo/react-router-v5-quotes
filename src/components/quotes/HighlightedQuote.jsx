import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './HighlightedQuote.module.css';

function HighlightedQuote(props) {
  const { author, text } = props;

  return (
    <figure className={classes.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
    </figure>
  );
}

HighlightedQuote.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default HighlightedQuote;
