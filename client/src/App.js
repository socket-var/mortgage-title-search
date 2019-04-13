import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import { connect } from "react-redux";
import Auth from "./auth/Auth";
import AppNavBar from "./common/AppNavBar";
import UserLandingPage from "./protected/user/UserLandingPage";
import AdminLandingPage from "./protected/admin/AdminLandingPage";
import ApproverLandingPage from "./protected/employee/ApproverLandingPage";
import LoginPage from "./auth/LoginPage";

class App extends Component {
  state = {};

  componentDidMount() {}

  renderAuthPage = ProtectedPage => {
    const { isUserLoggedIn, isAdminLoggedIn, isApproverLoggedIn } = this.props;
    return function(props) {
      if (!(isUserLoggedIn || isAdminLoggedIn || isApproverLoggedIn)) {
        return <LoginPage {...props} />;
      } else {
        return <ProtectedPage {...props} />;
      }
    };
  };

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavBar />
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" component={Auth} />
          <Route
            path="/user"
            component={this.renderAuthPage(UserLandingPage)}
          />
          <Route
            path="/employee"
            component={this.renderAuthPage(ApproverLandingPage)}
          />
          <Route
            path="/admin"
            component={this.renderAuthPage(AdminLandingPage)}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isUserLoggedIn: state.auth.isUserLoggedIn,
    isAdminLoggedIn: state.auth.isAdminLoggedIn,
    isApproverLoggedIn: state.auth.isApproverLoggedIn
  };
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
