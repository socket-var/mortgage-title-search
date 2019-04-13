import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ApproverDashboard from "./ApproverDashboard";

export default class ApproverLandingPage extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${match.path}/dashboard`}
            exact
            render={props => (
              <ApproverDashboard
                {...props}
                onSubmit={this.signupHandler}
                onInputChange={this.onInputChange}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
