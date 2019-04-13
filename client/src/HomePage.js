import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Welcome to TitleSearch
        </Typography>
        <Typography component="p">
          This application simulates a title search during a real-estate
          transaction using blockchain.
        </Typography>
      </Paper>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
