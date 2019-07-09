import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../../services/authService";

function LoggedInRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        return authService.isAuthenticated() ? (
          <Redirect to={{ pathname: "/rentals" }} />
        ) : (
          <Component {...props} {...rest} />
        );
      }}
    />
  );
}

export default LoggedInRoute;
