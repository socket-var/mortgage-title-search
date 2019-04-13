import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ApproverDashboard from "./ApproverDashboard";
import axios from "axios";
import { getBCData, getBuyerRecords, getStatus } from "../../redux/actions";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class ApproverLandingPage extends Component {
  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    this.props.getBuyerRecords();
  }

  getStatus = evt => {
    evt.preventDefault();
    this.props.getStatus("Victor Stachura");
  };

  render() {
    const { match, buyerRecords, buyerStatus } = this.props;

    return (
      <div>
        {buyerStatus ? buyerStatus.status : ""}
        <Switch>
          <Route
            path={`${match.path}/dashboard`}
            exact
            render={props => (
              <ApproverDashboard
                {...props}
                onSubmit={this.signupHandler}
                onInputChange={this.onInputChange}
                buyerRecords={buyerRecords}
                getStatus={this.getStatus}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buyerRecords: state.getRecordsReducer.buyerRecords,
  buyerStatus: state.getDataReducer.buyerStatus
});

const mapDispatchToProps = {
  getBCData,
  getBuyerRecords,
  getStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproverLandingPage);
