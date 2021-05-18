import React from 'react';
import { Redirect, Route } from 'react-router';

function ProtectedRoute({ children, authenticated, ...rest }) {
  if (authenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
}

export default ProtectedRoute;
