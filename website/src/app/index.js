import React, { useContext, useEffect, useState } from "react";
import {
  FAQ,
  Home,
  RegisterForm,
  Matches,
  LandingPage,
  LoginPage,
  Sessions,
  Mentee,
  Chat,
  Profile,
  EditProfile,
  Mentor,
} from "../pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/auth";
import { theme } from "./GlobalTheme";
import PostRegistration from "../pages/Register/postRegistration/PostRegistration";
// import { UserContext, UserProvider } from "../context/UserContext";
// import { getUserInfo } from "../api";

import { Provider } from "react-redux";
import Store from "../redux/Store";

function App() {
  return (
    // <UserProvider>
    <Provider store={Store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute path="/FAQ" exact component={FAQ} />
            <Route exact path="/linkedin" component={LinkedInPopUp} />
            {/* each route below needs to import their own Menu component. 
            ...See matches for example  */}
            <Route path="/chat" component={Chat} />
            <Route path="/mentee" component={Mentee} />
            <Route path="/mentor" component={Mentor} />
            <Route path="/profile" component={Profile} />
            <Route path="/edit-profile" component={EditProfile} />

            <PrivateRoute path="/matches" component={Matches} />
            <PrivateRoute path="/profile" component={LandingPage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute
              path="/postRegistration"
              component={PostRegistration}
            />
            <PrivateRoute path="/sessions" component={Sessions} />
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
    // </UserProvider>
  );
}

export default App;
