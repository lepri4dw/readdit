import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Comment, CommentMutation} from "../../types";
import {RootState} from "../../app/store";

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchAll',
  async (postId) => {
    const response = await axiosApi.get<Comment[]>('/comments?post=' + postId);
    return response.data;
  }
);

export const createComment = createAsyncThunk<void, CommentMutation, {state: RootState}>(
  'comments/create',
  async (commentMutation, {getState}) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post('/comments', commentMutation, {headers: {'Authorization': user.token}});
    }
  }
);