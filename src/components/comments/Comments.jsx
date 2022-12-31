import React, { useCallback, useEffect, useState } from 'react';

import { Prompt, useRouteMatch } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

function Comments() {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    params: { id },
  } = useRouteMatch();
  const {
    data, error, status, sendRequest,
  } = useHttp(getAllComments, true);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const finishAddCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    // so we simply trigger fetching in the callback (as we can't do it in the useEffect here)
    sendRequest(id);
  }, [id, sendRequest]);

  // here we can't use MOUNT/UNMOUNT events because we have a different case:
  // it is not like adding a new quote and then CHANGING the route (which leads to UNMOUNT/MOUNT)
  // when we go to Quotes page (and as a result we fetch updated quotes ON MOUNT in useEffect).
  // here we DON'T change the route after we finish adding comment and submit the form
  // because BOTH Comments AND NewCommentForm are rendered under SAME ROUTE:'/quotes/id/comments'
  // and as a result Comments never change its state: it was mounted before adding a comment,
  // and it never unmounts/re-mounts in the process and after all.
  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  return (
    <>
      <Prompt
        message="Are you sure you want to leave this page? All entered data will be lost!"
        when={isAddingComment}
      />
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
        {isAddingComment && (
          <NewCommentForm onCommentAdd={finishAddCommentHandler} />
        )}
        {!data || (data && data.length === 0) ? (
          <p>No comments yet...</p>
        ) : (
          <CommentsList comments={data} />
        )}
      </section>
    </>
  );
}

export default Comments;
