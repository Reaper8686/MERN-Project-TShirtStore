import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticate} from "./index";

function AdminRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticate() && isAuthenticate().user.role ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
