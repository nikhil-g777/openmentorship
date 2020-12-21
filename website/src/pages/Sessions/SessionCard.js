// Packages
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Link from "@material-ui/core/Link";

const statusMapping = {
  pending: "Pending",
  active: "Opt In",
  closed: "Closed",
  waitlist: "Join the Waitlist",
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#51b6a5",
    display: "flex",
    maxWidth: 650,
    margin: "auto",
    marginTop: 20,
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    marginLeft: "auto",
  },
  button: {
    width: 250,
  },
});

export default function SessionCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={props.onClick}>
      <CardContent className={classes.info}>
        <Typography component="h2">
          {moment(props.session.startDate).format("MMMM Do YYYY")} -{" "}
          {moment(props.session.endDate).format("MMMM Do YYYY")}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" className={classes.button}>
          {" "}
          {statusMapping[props.session.status]}{" "}
        </Button>
      </CardActions>
    </Card>
  );
}
