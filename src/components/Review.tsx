import React from 'react';
import { Grid, Box, Button } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Link from 'next/link';
import image1 from '@src/static/img/test1.png';

type ReviewProps = {
  review: { id: number; title: string; content: string };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderRadius: '20px',
      backgroundImage: `url(${image1.src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '500px',
    },
    content: {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
    btn: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      borderRadius: '30px',
    },
  })
);

const Review: React.FC<ReviewProps> = ({ review }: ReviewProps) => {
  const classes = useStyles();
  return (
    <Grid item sm={4}>
      <Box className={classes.image} />
      <Box fontSize="h5.fontSize" fontWeight="bold" my={2}>
        {review.title}
      </Box>
      <Box mb={2} className={classes.content}>
        {review.content}
      </Box>
      <Box mb={2}>
        <Link href="/blog">
          <Button color="primary" variant="contained" className={classes.btn}>
            รับชมรัวิว
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default Review;
