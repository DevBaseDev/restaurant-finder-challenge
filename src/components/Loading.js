import React from "react";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  grid: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    backgroundColor: "#2a2a2aaa"
  }
});

function Loading() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.grid}
    >
      <CircularProgress />
    </Grid>
  );
}

export default Loading;