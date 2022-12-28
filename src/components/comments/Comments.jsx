import React, { useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

function Comments() {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button
          className="btn"
          onClick={startAddCommentHandler}
          type="button"
        >
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm />}
      <p>Comments...</p>
    </section>
  );
}

export default Comments;
