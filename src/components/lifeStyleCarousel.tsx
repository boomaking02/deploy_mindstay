import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import life1 from '@public/static/img/life1.png';
import life2 from '@public/static/img/life2.png';
import life3 from '@public/static/img/life3.png';
import life4 from '@public/static/img/life4.png';
import life5 from '@public/static/img/life5.png';
import life6 from '@public/static/img/life6.png';
import life7 from '@public/static/img/life7.png';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 40,
  },
};

const useStyles = makeStyles(() => ({
  imgCover: { height: '100%', objectFit: 'cover', borderRadius: 5, pointerEvents: 'none' },
}));
const LifeStyleCarousel: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Carousel responsive={responsive} arrows={false} swipeable draggable partialVisible centerMode={false}>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life1.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          ทะเล
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life2.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          เรียบหรู Luxury
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life3.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          ภูเขา
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life4.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          บ้านหลังใหญ่
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life5.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          รถบ้าน/เต้นด์โดม
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life6.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          ตะลุยแอดเวนเจอร์
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life7.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          ผจญภัย
        </Typography>
      </Box>
      <Box px={1} pb={10} height="100%">
        <CardMedia component="img" image={life7.src} className={classStyle.imgCover} />
        <Typography align="center" variant="h6">
          เหมาทั้งหลัง
        </Typography>
      </Box>
    </Carousel>
  );
};

export default LifeStyleCarousel;
