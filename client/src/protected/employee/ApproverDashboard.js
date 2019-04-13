import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBCData } from "../../redux/actions";

const ApproverDashboard = ({ buyerRecords, getStatus }) => {
  let records = [];

  if (buyerRecords) {
    console.log(buyerRecords);
    records = buyerRecords.data.map(record => (
      <li>
        <div>{record.buyer}</div>
        <div>{record.seller}</div>
        <div>{record.property_name}</div>
        <button type="submit" onClick={getStatus}>
          Get status
        </button>
      </li>
    ));
  }

  return <div>{records}</div>;
};

ApproverDashboard.propTypes = {};
const mapStateToProps = state => ({
  bc_data: state.bc_data
});

const mapDispatchToProps = {
  getBCData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproverDashboard);
