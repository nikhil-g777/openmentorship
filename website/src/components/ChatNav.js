import React, { Component } from "react";
import { Link } from "react-router-dom";

class ChatNav extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="container-fluid chat-nav-wrapper">
          <div class="wrapper">
          <div class="row bg-changes">
              <div class="col-4">
                  <Link to="/chat" className="nav-link">
                    Chat
              </Link>
              </div>
              <div class="col-4">
                  <Link to="/Questions" className="nav-link">
                    Questions
              </Link>
              </div>
              <div class="col-4">
                  <Link to="/Meetings" className="nav-link">
                    Meetings
              </Link>
              </div>
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatNav;
