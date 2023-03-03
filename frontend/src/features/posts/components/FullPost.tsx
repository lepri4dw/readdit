import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectOnePost, selectOnePostFetching} from "../postsSlice";
import {useParams} from "react-router-dom";
import {fetchOnePost} from "../postsThunks";
import {Box, CircularProgress, Typography} from "@mui/material";
import dayjs from "dayjs";
import {apiURL} from "../../../constants";

const imageStyle: React.CSSProperties = {
  width: '170px',
  height: '150px',
  float: 'left',
  marginRight: '16px',
  marginBottom: '16px',
};

const FullPost = () => {
  const dispatch = useAppDispatch();
  const id = (useParams()).id as string
  const post = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectOnePostFetching);

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? <CircularProgress/> : post &&
        <Box>
          {post.image && <img src={apiURL + '/' + post.image} alt={post.title} style={imageStyle} />}
          <Typography variant="h6">{dayjs(post.datetime).format('DD:MM:YYYY HH:mm')} by {post.user.displayName}</Typography>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body1">
            {post.description}
          </Typography>
        </Box>
      }
    </>
  );
};

export default FullPost;