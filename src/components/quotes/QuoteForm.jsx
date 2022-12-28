/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

function QuoteForm(props) {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const { isLoading, onAddQuote } = props;

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea id="text" rows="5" ref={textInputRef} />
        </div>
        <div className={classes.actions}>
          <button className="btn" type="submit">
            Add Quote
          </button>
        </div>
      </form>
    </Card>
  );
}

QuoteForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onAddQuote: PropTypes.func.isRequired,
};

export default QuoteForm;
