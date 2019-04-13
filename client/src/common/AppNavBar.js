import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signoutUser } from "../redux/actions";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  floatToolBarItems: {
    justifyContent: "space-between"
  },
  logo: {
    marginRight: "2em",
    textDecoration: "none"
  },
  growChild: {
    flexGrow: 1
  },
  defaultChild: {
    flexGrow: 0
  }
});

class AppNavBar extends React.Component {
  state = {
    value: 0,
    openRight: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  toggleDrawer = open => () => {
    this.setState({
      openRight: open
    });
  };

  render() {
    const {
      classes,
      isUserLoggedIn,
      isAdminLoggedIn,
      isApproverLoggedIn,
      signoutUser
    } = this.props;
    const { value, openRight } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar
            className={
              isUserLoggedIn || isAdminLoggedIn || isApproverLoggedIn
                ? ""
                : classes.floatToolBarItems
            }
          >
            <Typography
              variant="h3"
              color="inherit"
              className={[classes.defaultChild, classes.logo].join(" ")}
              to="/"
              component={Link}
            >
              TitleSearch
            </Typography>

            {!(isAdminLoggedIn || isUserLoggedIn || isApproverLoggedIn) && (
              <div>
                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  to="/auth/register"
                  component={Link}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  to="/auth/login"
                  component={Link}
                >
                  Login
                </Button>
              </div>
            )}

            {isUserLoggedIn && (
              <React.Fragment>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  className={classes.growChild}
                >
                  <Tab
                    label="Dashboard"
                    to="/user/dashboard"
                    component={Link}
                  />
                </Tabs>
                <Button
                  color="inherit"
                  className={classes.defaultChild}
                  onClick={this.toggleDrawer(true)}
                >
                  Your Account
                </Button>
              </React.Fragment>
            )}

            {(isAdminLoggedIn || isUserLoggedIn || isApproverLoggedIn) && (
              <Button
                color="inherit"
                className={classes.defaultChild}
                onClick={signoutUser}
              >
                Sign out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isAdminLoggedIn: PropTypes.bool.isRequired,
  isApproverLoggedIn: PropTypes.bool.isRequired,
  signoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.auth.isUserLoggedIn,
  isAdminLoggedIn: state.auth.isAdminLoggedIn,
  isApproverLoggedIn: state.auth.isApproverLoggedIn
});

const mapDispatchToProps = {
  signoutUser
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppNavBar)
);
