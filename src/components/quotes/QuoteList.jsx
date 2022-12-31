import React from 'react';
import * as PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import sortQuotes from '../../utils/utils';

function QuoteList(props) {
  const { quotes } = props;
  const history = useHistory();
  const location = useLocation();
  const { pathname, search } = location;
  const queryParams = new URLSearchParams(search);
  const sortOrder = queryParams.get('sort');
  const isAscending = sortOrder === 'asc';
  const sortedQuotes = sortQuotes(quotes, isAscending);

  const changeSortOrderHandler = () => {
    // interestingly this will cause <QuoteList /> component re-evaluation
    // because every URL change triggers Routes' re-evaluation APP WIDE.
    // and this is good for our case as we can use this dynamic value to
    // construct new URL AND use updated searchParams inside this component
    // to make decision on what we want to render and how we want to sort
    // quotes.
    history.push(`${pathname}?sort=${isAscending ? 'desc' : 'asc'}`);
    // actually there is another (a slightly different) way of pushing something to history stack.
    // it is not right OR wrong choice - it is just a bit more structured way:
    history.push({
      pathname,
      search: `?sort=${isAscending ? 'desc' : 'asc'}`,
    });
  };

  return (
    <>
      <div className={classes.sorting}>
        <button type="button" onClick={changeSortOrderHandler}>
          {`Sort ${isAscending ? 'descending' : 'ascending'}`}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
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
