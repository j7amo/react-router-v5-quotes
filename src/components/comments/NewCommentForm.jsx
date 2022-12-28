/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';

import classes from './NewCommentForm.module.css';

function NewCommentForm() {
  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
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

export default NewCommentForm;
