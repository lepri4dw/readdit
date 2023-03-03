import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Post, PostMutation, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<Post[]>('/posts');
    return response.data;
  }
);

export const fetchOnePost = createAsyncThunk<Post, string>(
  'posts/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Post>('/posts/' + id);
    return response.data;
  }
);

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState, rejectValue: ValidationError}>(
  'posts/create',
  async (postMutation, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        await axiosApi.post('/posts', {
          ...postMutation,
          user: user._id
        }, {headers: {'Authorization': user.token}})
      }
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
          return rejectWithValue(e.response.data as ValidationError);
        }
        throw e;
    }
});
