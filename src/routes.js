// Core
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom
import HomePage from 'components/HomePage';

/** Renders react router for App container
 * */
const routes = ({ props }) => {
  const { match: { path } } = props;
  const filteredAppPath = path.endsWith('?') ? path.slice(0, -1) : path;
  return (
    <Switch>
      <Route
        exact
        path={`${filteredAppPath}:lang?`}
        render={() => <HomePage {...props} />}
      />
      {/* NOTE: put other app routes here */}
    </Switch>
  );
};

export default routes;
