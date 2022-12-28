import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './CommentItem.module.css';

function CommentItem(props) {
  const { text } = props;

  return (
    <li className={classes.item}>
      <p>{text}</p>
    </li>
  );
}

CommentItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CommentItem;
