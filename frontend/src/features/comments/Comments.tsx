import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectComments, selectCommentsFetching} from "./commentsSlice";
import {fetchComments} from "./commentsThunks";
import {Alert, Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import CommentForm from "./components/CommentForm";
import {selectUser} from "../users/usersSlice";

interface Props {
  postId: string;
}

const Comments: React.FC<Props> = ({postId}) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const loading = useAppSelector(selectCommentsFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);


  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h4">Comments</Typography>
        </Grid>
        <Grid item>
          {loading ? <CircularProgress/> : <Grid container spacing={2}>
            {comments.map(comment => (
              <Grid item xs={12} key={comment._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{dayjs(comment.datetime).format('DD.MM.YYYY HH:mm')} by {comment.user.displayName}</Typography>
                    <Typography variant="h5" sx={{mt:2}}>{comment.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>}
        </Grid>
      </Grid>
      <Grid item sx={{mb: 2}}>
        {user ? <CommentForm postId={postId}/> :
          <Alert style={{fontSize: '25px', padding: '10px'}} severity="warning">If you would like to comment <Link to="/register">Sign Up</Link> or <Link to="/login">Sign In</Link></Alert>}
      </Grid>
    </Grid>
  );
};

export default Comments;