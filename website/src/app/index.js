import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import PrivateRoute from "./PrivateRoute";
import { theme } from "./GlobalTheme";
import Store from "../redux/Store";

import { AdminEditProfile, Dashboard, Match, Session } from "../admin/pages";

import PostRegistration from "../pages/Register/postRegistration/PostRegistration";
import {
  FAQ,
  RegisterForm,
  Matches,
  LandingPage,
  LoginPage,
  Sessions,
  // Mentee,
  Chat,
  Profile,
  EditProfile,
} from "../pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "../context/UserContext";

function App() {
  return (
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
            {/* <Route path="/mentee" component={Mentee} /> */}
            <PrivateRoute path="/matches" component={Matches} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />

            <PrivateRoute path="/profile" component={LandingPage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute
              path="/postRegistration"
              component={PostRegistration}
            />
            <PrivateRoute path="/sessions" component={Sessions} />

            {/* admin routes */}
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/sessions" component={Session} />
            <Route path="/admin/match" component={Match} />
            <Route path="/admin/edit-profile" component={AdminEditProfile} />
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
