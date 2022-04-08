import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../pagination/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentCardId, setCurrentCardId] = useState(0);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  let handleUpdateCardIdState = (cardId) => {
    console.log("Handle Update Clicked!");
    console.log(cardId);
    setCurrentCardId(cardId);
  };

  const searchPost = () => {
    //  console.log(tags);
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts handleUpdateCardIdState={handleUpdateCardIdState} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  onKeyDown={handleKeyPress}
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>
              <Form
                currentCardId={currentCardId}
                handleUpdateCardIdState={handleUpdateCardIdState}
              />
              {!searchQuery && !tags.length && (
                <Paper elevation={6}>
                  <Pagination page={page} className={classes.pagination} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}
