import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserInfo } from "../api";
import { useAuth } from "../context/auth";
// import { UserContext } from "../context/UserContext";

function PrivateRoute({ component: Component, ...rest }) {
  // const { authTokens } = useAuth();

  // const [user, setUser] = useContext(UserContext);
  // const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <Route
      {...rest}
      render={(props) =>
        // user.token ? (
        token ? (
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
