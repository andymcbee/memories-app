import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import useStyles from "./styles";

export default function Posts({ handleUpdateCardIdState }) {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      align-items="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} cs={12} sm={6} item>
          <Post post={post} handleUpdateCardIdState={handleUpdateCardIdState} />
        </Grid>
      ))}
    </Grid>
  );
}
