import React from 'react';
import { Grid, Box, Button } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Link from 'next/link';
import { ReviewProps } from '@src/models/review.models';

type StyleProps = {
  image: string;
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    image: {
      borderRadius: '20px',
      backgroundImage: ({ image }) => `url(${image})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '500px',
      maxWidth: '100%',
      transition: 'transform 0.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale3d(1.05, 1.05, 1)',
      },
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
      fontFamily: 'Prompt',
    },
  })
);

const Review: React.FC<ReviewProps> = ({ ...review }: ReviewProps) => {
  const classes = useStyles({ image: review.image });
  return (
    <Grid item sm={4}>
      <Box className={classes.image} />
      <Box fontSize="h5.fontSize" fontWeight="bold" mt={2} sx={{ fontFamily: 'Prompt' }}>
        {review.title}
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="bold" mb={2}>
        {review.subTitle}
      </Box>
      <Box mb={2} className={classes.content}>
        {review.shortDescription}
      </Box>
      <Box mb={2}>
        <Link href={`/review/${review.id}`}>
          <Button color="primary" variant="contained" className={classes.btn}>
            รับชมรัวิว
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default Review;
