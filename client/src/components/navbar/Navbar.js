import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

export default function Navbar() {
  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      //check and see if exp value (in milliseconds) is less than 1000. If so, log out.
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.firstName}
              src={user?.result.imageUrl}
            >
              {user?.result.firstName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.firstName}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
