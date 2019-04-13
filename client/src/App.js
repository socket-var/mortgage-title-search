import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import { connect } from "react-redux";
import Auth from "./auth/Auth";
import AppNavBar from "./common/AppNavBar";
import UserLandingPage from "./protected/user/UserLandingPage";
import AdminLandingPage from "./protected/admin/AdminLandingPage";

class App extends Component {
  state = {
    // isLoggedIn: false,
    // isAdminLoggedIn: false,
    // currentUserId: null,
    // message: "",
    // accountBalance: null
  };

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavBar />
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" component={Auth} />
          <Route path="/user" component={UserLandingPage} />
          <Route path="/admin" component={AdminLandingPage} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
