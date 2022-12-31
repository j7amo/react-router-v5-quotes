import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

function Quotes() {
  const {
    data, error, status, sendRequest,
  } = useHttp(getAllQuotes, true);

  // !!!IMPORTANT!!!
  // When a Route's 'path' attribute MATCHES the URL 'path' part:
  // 1) <Route /> component is MOUNTED ("becomes active").
  // 2) All its child components are MOUNTED too as a result (which is pure React stuff)
  // When we change the URL (e.g. with history.push/history/replace and so on)
  // And a Route's 'path' attribute NO LONGER MATCHES the URL 'path' part:
  // 1) <Route /> component is UNMOUNTED ("becomes inactive").
  // 2) All its child components are UNMOUNTED too as a result (which is pure React stuff)
  // That's why we don't need
  // to write some special conditions for quotes fetching after adding a new quote
  // in NewQuote component because we do it on the other route, we then
  // redirect to Quotes route (so it MOUNTS) and Quotes component MOUNTS and useEffect runs!
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data || (data && data.length === 0)) {
    return <NoQuotesFound />;
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  return (
    <>
      <h2>Quotes</h2>
      <QuoteList quotes={data} />
    </>
  );
}

export default Quotes;
