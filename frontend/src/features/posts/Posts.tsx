import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPosts, selectPostsFetching} from "./postsSlice";
import {fetchPosts} from "./postsThunks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PostItem from "./components/PostItem";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Posts
        </Typography>
      </Grid>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {posts.map(post => (
          <PostItem key={post._id} _id={post._id} title={post.title} image={post.image} datetime={post.datetime} displayName={post.user.displayName}/>
        ))}
      </Grid>}
    </Grid>
  );
};

export default Posts;