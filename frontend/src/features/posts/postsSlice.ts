import {Post} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPost, fetchOnePost, fetchPosts} from "./postsThunks";

interface PostsState{
  items: Post[],
  fetchLoading: boolean,
  onePost: Post | null,
  fetchOnePostLoading: boolean,
  createLoading: boolean,
}

const initialState: PostsState = {
  items: [],
  fetchLoading: false,
  onePost: null,
  fetchOnePostLoading: false,
  createLoading: false,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.items = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchOnePostLoading = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.fetchOnePostLoading = false;
      state.onePost = post;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.fetchOnePostLoading = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsFetching = (state: RootState) => state.posts.fetchLoading;
export const selectOnePost = (state: RootState) => state.posts.onePost;
export const selectOnePostFetching = (state: RootState) => state.posts.fetchOnePostLoading;
export const selectPostCreating = (state: RootState) => state.posts.createLoading;