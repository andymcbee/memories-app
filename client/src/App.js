import React from "react";
import { Container } from "@material-ui/core";

//import useStyles from "./styles";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postDetails/PostDetails";

export default function App() {
  //const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />

          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
