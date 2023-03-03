import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCommentCreating} from "../commentsSlice";
import {createComment, fetchComments} from "../commentsThunks";
import {Grid, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";

interface Props {
  postId: string;
}

const CommentForm: React.FC<Props> = ({postId}) => {
  const [state, setState] = useState('');
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCommentCreating)
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setState(value);
  }
  
  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment({text: state, post: postId}));
    setState('');
    dispatch(fetchComments(postId));
  }
  
  
  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2} sx={{mt: 3}}>
        <Grid item>
          <Typography variant="h5">Add your comment!</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            multiline rows={3}
            id="text" label="Comment"
            value={state} required
            onChange={inputChangeHandler}
            name="text"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={loading} type="submit" color="primary" variant="contained">Send</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;