import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ApproverDashboard from "./ApproverDashboard";
import axios from "axios";
import { getBCData, getBuyerRecords, getStatus } from "../../redux/actions";

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
