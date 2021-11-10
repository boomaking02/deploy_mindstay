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
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
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
  textTitle: { fontSize: '1.1 rem', fontWeight: 700, marginTop: 3, color: '#222222' },
  textNormal: { fontSize: '1 rem', fontWeight: 'normal', marginTop: 1, color: '#222222' },
}));
const RecommendCarousel: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Carousel responsive={responsive} showDots arrows={false} partialVisible>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec1.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec2.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
      <Box px={1} pb={3} height="100%">
        <CardMedia component="img" image={rec3.src} className={classStyle.imgCover} />
        <Typography className={classStyle.textTitle}>Hideout Koh Kood ห้อง Twin Villa</Typography>
        <Typography className={classStyle.textNormal}>ที่พักแนะนำ ณ เกาะกูด หาดส่วนตัว ที่พักวิวดีมากๆ</Typography>
      </Box>
    </Carousel>
  );
};

export default RecommendCarousel;
