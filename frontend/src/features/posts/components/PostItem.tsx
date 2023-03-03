import React from 'react';
import {Card, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import {apiURL} from "../../../constants";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  image: string | null;
  datetime: string;
  displayName: string;
  numberOfComments: number;
}

const ImageCardMedia = styled(CardMedia)({
  width: '170px',
  height: '150px',
  margin: '16px',
});

const PostItem: React.FC<Props> = ({_id, title,image, datetime, displayName, numberOfComments}) => {
  let cardImage = noImageAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }


  return (
    <Grid item xs={12} md={12}>
      <Card style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
        <Grid container alignItems="center" sx={{mb: 2}}>
          <ImageCardMedia image={cardImage} />
          <CardContent sx={{p: 2}}>
            <Typography variant="h6">{dayjs(datetime).format('DD.MM.YYYY HH:mm')} by {displayName}</Typography>
            <Typography variant="h5" component={Link} sx={{mt: 2}} to={'/posts/' + _id}>{title}</Typography>
            <Typography variant="subtitle1">Number of comments: {numberOfComments}</Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostItem;