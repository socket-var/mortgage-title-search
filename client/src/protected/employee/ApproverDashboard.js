import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getBCData } from "../../redux/actions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  submit: {
    marginTop: theme.spacing.unit * 3,
    width: "100px !important"
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
const ApproverDashboard = ({ buyerRecords, getStatus, classes }) => {
  let records = [];

  if (buyerRecords) {
    console.log(buyerRecords);
    records = buyerRecords.data.map(record => (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {record.buyer} -> {record.seller}
          </Typography>
          <Typography component="p">{record.property_name}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ background: "#009688" }}
            onClick={getStatus}
          >
            Get Status
          </Button>
        </Paper>
      </div>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ApproverDashboard)
);
