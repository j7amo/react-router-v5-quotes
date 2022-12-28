import React from 'react';
import * as PropTypes from 'prop-types';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

function QuoteList(props) {
  const { quotes } = props;

  return (
    <ul className={classes.list}>
      {quotes.map((quote) => (
        <QuoteItem
          key={quote.id}
          id={quote.id}
          author={quote.author}
          text={quote.text}
        />
      ))}
    </ul>
  );
}

QuoteList.propTypes = {
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default QuoteList;
