import React from 'react';
import {
  Route as NativeRoute,
  RouteProps as NativeRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends NativeRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  return (
    <NativeRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!signed) {
          return <Component {...rest} />;
        }

        return (
          <Redirect
            to={{
              pathname: signed ? '/dashboard' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
