import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectPostCreating} from "../postsSlice";
import {PostMutation} from "../../../types";
import {createPost} from "../postsThunks";
import {useNavigate} from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";

const PostForm = () => {
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null
  })
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostCreating);
  const navigate = useNavigate();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createPost(state));
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title" required
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>

        <Grid item xs>
          {<LoadingButton loadingIndicator="Loading…" loading={loading} type="submit" color="primary" variant="contained" disabled={!state.title || (!state.image && !state.description)}>Create</LoadingButton>}
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;