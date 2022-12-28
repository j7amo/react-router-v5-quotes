import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './QuoteItem.module.css';

function QuoteItem(props) {
  const { author, text } = props;

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <a className="btn" href="/">
        View Fullscreen
      </a>
    </li>
  );
}

QuoteItem.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default QuoteItem;
