import React from 'react';
import * as PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

function CommentsList(props) {
  const { comments } = props;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CommentsList;
