import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import memories from "./images/memories.png";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import useStyles from "./styles";

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentCardId, setCurrentCardId] = useState(0);

  useEffect(() => {
    console.log("Use effect fired");

    dispatch(getPosts());
  }, [currentCardId, dispatch]);

  let handleUpdateCardIdState = (cardId) => {
    console.log("Handle Update Clicked!");
    console.log(cardId);
    setCurrentCardId(cardId);
  };

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts handleUpdateCardIdState={handleUpdateCardIdState} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentCardId={currentCardId}
                handleUpdateCardIdState={handleUpdateCardIdState}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
