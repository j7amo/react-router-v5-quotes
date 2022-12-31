import React from 'react';
import * as PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import classes from './QuoteItem.module.css';

function QuoteItem(props) {
  const { url } = useRouteMatch();
  const { author, id, text } = props;

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      {/* here we use:
       - dynamic 'url' value provided by useRouteMatch hook
       - dynamic 'id' value inside template literal to construct path */}
      <Link className="btn" to={`${url}/${id}`}>
        View Fullscreen
      </Link>
    </li>
  );
}

QuoteItem.propTypes = {
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default QuoteItem;
