import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function NewQuote() {
  // useHistory hook gives us access to 'history' object
  // and allows to use its methods to imperatively change URL path
  // or travel N number of pages back/forth using the history stack
  const history = useHistory();
  const { error, status, sendRequest } = useHttp(addQuote);

  const quoteAddHandler = (quote) => {
    sendRequest(quote);
    // If we want to see the newly added quote after we submit it,
    // and after the redirect to Quotes page then we can't
    // just redirect here like this:
    // history.push('/quotes')
    // The problem is:
    // React Router is very fast (so the latency is almost non-existent).
    // But 'sendRequest' is a function that sends data to a remote server
    // and in 99.99% of time it will be slower than local routing.
    // So by the time we redirect to another page the new data won't be ready.
    // One naive way of fixing this is using 'setTimeout'
    // setTimeout(() => history.push('/quotes'), 2000);
    // but it is very inconsistent because you never know what connection user has,
    // or if the server is up-and-running.
  };

  // we can solve this problem of early redirect simply with useEffect
  // AND 'status' dependency:
  // After the data was sent successfully the status will change from 'pending'
  // to 'completed'. The change of status will trigger the creation of new state.
  // New state will trigger re-evaluation of NewQuote component. Re-evaluation PLUS
  // 'status' dependency change will trigger useEffect call, and we will
  // finally redirect.
  useEffect(() => {
    if (status === 'completed' && !error) {
      history.push('/quotes');
      // we could've used 'replace' but we want to give user an opportunity
      // to return to the previous page
      // history.replace('/quotes');
    }
  }, [error, history, status]);

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
      <h2>Add a quote</h2>
      <QuoteForm
        isLoading={status === 'pending'}
        onAddQuote={quoteAddHandler}
      />
    </>
  );
}

export default NewQuote;
