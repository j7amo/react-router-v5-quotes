/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import * as PropTypes from 'prop-types';

import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

function QuoteForm(props) {
  // we use this state slice to track if the user is currently entering
  // something in the form, it will help us prevent input data loss
  const [isEntering, setIsEntering] = useState(false);
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

  // when user starts interacting with the form - the form is focused,
  // and in this 'mode' the <Prompt /> component will be triggered
  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  // to let user submit the form (we do some redirecting on form submit)
  // without prompt we should change the value of the flag to 'false'
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <>
      {/* If we want to protect user from losing all the non-submitted values
      in situations when user accidentally swipes backwards/forwards or misclicks (this
       can be a very good feature especially when we have a form with lots of inputs)
       and as a result leaves the current page then we have to listen to 'path' change.
       And for this React Router also has built-in component: <Prompt /> which
        helps prevent UNWANTED PAGE TRANSITIONS */}
      <Prompt
        message="Are you sure you want to leave this page? All entered data will be lost!"
        when={isEntering}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
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
            <button
              onClick={finishEnteringHandler}
              className="btn"
              type="submit"
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

QuoteForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onAddQuote: PropTypes.func.isRequired,
};

export default QuoteForm;
