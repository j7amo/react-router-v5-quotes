/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';

import { useRouteMatch } from 'react-router-dom';
import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

function NewCommentForm(props) {
  const { onCommentAdd } = props;
  const commentTextRef = useRef();
  const {
    params: { id },
  } = useRouteMatch();
  const { error, status, sendRequest } = useHttp(addComment);

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here

    // send comment to server
    sendRequest({
      quoteId: id,
      commentData: commentTextRef.current.value,
    });
  };

  // here once again we want to NOTIFY parent component that we are done fetching
  // and parent component callback can be invoked to fetch updated comments
  useEffect(() => {
    if (status === 'completed' && !error) {
      onCommentAdd();
    }
  }, [onCommentAdd, status]);

  if (status === 'pending') {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef} />
      </div>
      <div className={classes.actions}>
        <button className="btn" type="submit">
          Add Comment
        </button>
      </div>
    </form>
  );
}

NewCommentForm.propTypes = {
  onCommentAdd: PropTypes.func.isRequired,
};

export default NewCommentForm;
