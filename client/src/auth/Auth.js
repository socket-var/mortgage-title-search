import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../redux/actions";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import { Route, Switch, Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    emailField: "",
    passwordField: "",
    confirmPasswordField: ""
  };

  onInputChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  };

  signupHandler = evt => {
    const { emailField, passwordField, confirmPasswordField } = this.state;

    evt.preventDefault();
    this.props.registerUser(emailField, passwordField, confirmPasswordField);
  };

  loginHandler = evt => {
    const { emailField, passwordField } = this.state;
    evt.preventDefault();
    this.props.loginUser(emailField, passwordField);
  };

  // signupHandler = async evt => {
  //   evt.preventDefault();

  //   const {
  //     accountAddressField,
  //     emailField,
  //     passwordField,
  //     confirmPasswordField,
  //     privateKeyField
  //   } = this.state;

  //   if (passwordField === confirmPasswordField) {
  //     try {
  //       const signupResult = axios.post("/auth/signup", {
  //         accountAddress: accountAddressField,
  //         email: emailField,
  //         password: passwordField,
  //         privateKey: privateKeyField
  //       });

  //       const { user, message } = signupResult.data;

  //       this.props.openSnackbar(message);
  //       this.setState({
  //         isLoggedIn: true,
  //         currentUserId: user._id,
  //         accountBalance: user.accountBalance
  //       });
  //     } catch (err) {
  //       this.catchFunction(err);
  //     }
  //   } else {
  //     this.props.openSnackbar("Passwords do not match. Please try again!");
  //     this.setState({
  //       message: "Passwords do not match. Please try again!"
  //     });
  //   }
  // };

  // loginHandler = async evt => {
  //   evt.preventDefault();

  //   const { emailField, passwordField } = this.state;

  //   try {
  //     const loginResult = await axios.post("/auth/login", {
  //       email: emailField,
  //       password: passwordField
  //     });
  //     const { user, message } = loginResult.data;
  //     this.props.openSnackbar(message);
  //     if (user.isAdmin) {
  //       this.setState({
  //         isAdminLoggedIn: true,
  //         currentUserId: user._id,
  //         accountBalance: user.accountBalance
  //       });
  //     } else {
  //       this.setState({
  //         isLoggedIn: true,
  //         currentUserId: user._id,
  //         accountBalance: user.accountBalance
  //       });
  //     }
  //   } catch (err) {
  //     this.catchFunction(err);
  //   }
  // }

  render() {
    const {
      match,
      isUserLoggedIn,
      isAdminLoggedIn,
      isApproverLoggedIn
    } = this.props;

    let redirect;

    if (isUserLoggedIn) {
      redirect = <Redirect to="/user/dashboard" />;
    } else if (isAdminLoggedIn) {
      redirect = <Redirect to="/admin/dashboard" />;
    } else if (isApproverLoggedIn) {
      redirect = <Redirect to="/employee/dashboard" />;
    }

    return (
      <Switch>
        {/* TODO: if logged in redirect to dashboard */}
        {redirect}
        <Route
          path={`${match.path}/register`}
          exact
          render={props => (
            <SignupPage
              {...props}
              onSubmit={this.signupHandler}
              onInputChange={this.onInputChange}
            />
          )}
        />
        <Route
          path={`${match.path}/login`}
          exact
          render={props => (
            <LoginPage
              {...props}
              onSubmit={this.loginHandler}
              onInputChange={this.onInputChange}
            />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.auth.isUserLoggedIn,
  isAdminLoggedIn: state.auth.isAdminLoggedIn,
  isApproverLoggedIn: state.auth.isApproverLoggedIn
});

const mapDispatchToProps = {
  registerUser,
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
