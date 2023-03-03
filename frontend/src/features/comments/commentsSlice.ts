import {Comment} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createComment, fetchComments} from "./commentsThunks";

interface CommentsState {
  items: Comment[],
  fetchLoading: boolean,
  createLoading: boolean
}

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
      state.fetchLoading = false;
      state.items = comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsFetching = (state: RootState) => state.comments.fetchLoading;
export const selectCommentCreating = (state: RootState) => state.comments.createLoading;

