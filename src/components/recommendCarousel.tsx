import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import rec1 from '@src/static/img/rec1.png';
import rec2 from '@src/static/img/rec2.png';
import rec3 from '@src/static/img/rec3.png';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const useStyles = makeStyles(() => ({
  imgCover: {
    objectFit: 'cover',
    borderRadius: 5,
    pointerEvents: 'none',
  },
}));
const RecommendCarousel: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Carousel responsive={responsive} draggable arrows={false} partialVisible>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={rec1.src} className={classStyle.imgCover} />
        <Typography variant="h6">Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography variant="body1">ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={rec2.src} className={classStyle.imgCover} />
        <Typography variant="h6">Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography variant="body1">ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography variant="h6">Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography variant="body1">ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography variant="h6">Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography variant="body1">ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
    </Carousel>
  );
};

export default RecommendCarousel;
