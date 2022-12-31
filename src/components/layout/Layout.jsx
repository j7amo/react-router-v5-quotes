import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';

function Layout(props) {
  const { children } = props;

  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
