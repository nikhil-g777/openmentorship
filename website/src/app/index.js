import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Explore from "../pages/Explore/Explore";
import PrivateRoute from "./PrivateRoute";
import { theme } from "./GlobalTheme";
import Store from "../redux/Store";

import {
  AdminEditProfile,
  Dashboard,
  Match,
  MentorApplications,
  Session,
  UserProfile,
} from "../admin/pages";

import PostRegistration from "../pages/Register/postRegistration/PostRegistration";
import {
  FAQ,
  RegisterForm,
  Matches,
  LandingPage,
  // Mentee,
  Chat,
  Profile,
  EditProfile,
} from "../pages";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <Route path="/explore" component={Explore} />
            {/* each route below needs to import their own Menu component. 
            ...See matches for example  */}
            <Route path="/chat" component={Chat} />
            {/* <Route path="/mentee" component={Mentee} /> */}
            <PrivateRoute path="/matches" component={Matches} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />

            <PrivateRoute path="/profile" component={LandingPage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LandingPage} />
            <PrivateRoute
              path="/postRegistration"
              component={PostRegistration}
            />

            {/* admin routes */}
            <PrivateRoute path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin/sessions" component={Session} />
            <PrivateRoute path="/admin/match" component={Match} />
            <PrivateRoute
              path="/admin/edit-profile"
              component={AdminEditProfile}
            />
            <PrivateRoute
              path="/admin/mentor-applications/:page?"
              component={MentorApplications}
            />
            <PrivateRoute
              path="/admin/user-profile/:id"
              component={UserProfile}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
