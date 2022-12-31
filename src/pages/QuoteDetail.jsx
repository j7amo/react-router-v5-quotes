import React, { useEffect } from 'react';
import {
  Link, Route, useParams, useRouteMatch,
} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetail() {
  const { id } = useParams();
  const {
    data, error, status, sendRequest,
  } = useHttp(getSingleQuote, true);
  // to make URL path construction more flexible and dynamic
  // we can use another hook from React Router which gives us a match object:
  const match = useRouteMatch();
  // {
  //   "path": "/quotes/:id", <= by using this we can place a dynamic placeholder for ROUTE MATCHING
  //     "url": "/quotes/q2", <= by using this we can place literal URL path for URL CHANGING
  //     "isExact": false,
  //     "params": {
  //   "id": "q2"
  //   }
  // }

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

  if (!data) {
    return <NoQuotesFound />;
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  const { author, text } = data;

  return (
    <section>
      <HighlightedQuote author={author} text={text} />
      {/* Let's say we want the Link to be visible only when we haven't yet clicked
       'Load comments' AND it should not be rendered after the click.
        We could've done it with some state and handlers and so on, but we can also use
        the power of React Router! We just need to remember that <Route /> is just
        a component which children will be rendered ONLY when:
        1) The Route itself is evaluated (in our case it will be only when QuoteDetail
         component is rendered - because Route is a child here)
        2) The Link which is the child of Route will be rendered ONLY when path matches
        So we can use as a CONDITIONAL RENDERING tool without any explicit state slice!
        p.s. This is available because we can use NESTED ROUTING (i.e. <Route /> can
        be used anywhere we want, the only restriction - it must be a descendant
        of <BrowserRouter />(when the whole App is wrapped with it - it's not a problem!
        p.p.s. We can do conditional rendering like this ONLY when the data (e.g. 'id')
        can be retrieved from the URL (either direct or maybe it's a derived data */}
      {/* here we are using placeholder for 'path' matching */}
      <Route path={match.path} exact>
        <div className="centered">
          {/* but here we need a specific value and NOT a placeholder(!) because we want
           to change URL path with it */}
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load comments
          </Link>
        </div>
      </Route>
      {/* here we use a special React Router feature:
      NESTED ROUTE. It enables kind of conditional START(!) of route evaluation.
      in this example <Route path="/quotes/:id/comments"> will be evaluated ONLY
      IF <QuoteDetail /> component renders but the <Comments /> component will
      be rendered ONLY if Route 'path' matches URL path */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
}

export default QuoteDetail;
