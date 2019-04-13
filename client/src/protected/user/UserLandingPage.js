import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export class UserLandingPage extends Component {
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
              <UserDashboard
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLandingPage);
