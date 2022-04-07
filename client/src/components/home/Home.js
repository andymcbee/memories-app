import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

export default function Home() {
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
    <>
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
    </>
  );
}
