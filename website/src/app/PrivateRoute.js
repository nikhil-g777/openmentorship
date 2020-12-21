import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ component: Component, ...rest }) {
  // const { authTokens } = useAuth();

  const [user, setUser] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referrer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
