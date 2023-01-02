import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Quotes from './pages/Quotes';
// Let's do some optimization!
// When a user visits our app, the default page will be'/quotes'.
// So it is a good idea to postpone the loading of the code
// related to '/new-quote' because user may not even go there,
// but still has to download ALL the code for our application to work.
// We can change this by splitting code into chunks with React.lazy method.
// lazy-STEP 1:
// remove the traditional import for components/pages that are not needed
// straight away after a user visits the page:
// import QuoteDetail from './pages/QuoteDetail';
// import NewQuote from './pages/NewQuote';
// import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

// lazy-STEP 2:
// add lazy component loading via React.lazy and dynamic import:
const QuoteDetail = lazy(() => import('./pages/QuoteDetail'));
const NewQuote = lazy(() => import('./pages/NewQuote'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    // lazy-STEP 3:
    // wrap lazy loaded content with <Suspense/> to provide a fallback
    // for the state when component is being loaded.
    <Layout>
      <Suspense
        fallback={(
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/quotes/:id">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          {/* "*" is a special 'path' value which matches
          ANY non-existent page on the current domain,
          which is helpful when we want to route to a 'Not found page; */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
