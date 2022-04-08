import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import useStyles from "./styles";

export default function Posts({ handleUpdateCardIdState }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts to show";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      align-items="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} cs={12} sm={12} md={6} lg={3} item>
          <Post post={post} handleUpdateCardIdState={handleUpdateCardIdState} />
        </Grid>
      ))}
    </Grid>
  );
}
