import React from 'react';
import {
  Route as NativeRoute,
  RouteProps as NativeRouteProps,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends NativeRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const token = false;

  return (
    <NativeRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!token) {
          return <Component {...rest} />;
        }

        return (
          <Redirect
            to={{
              pathname: token ? '/dashboard' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
