import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import int1 from '@src/static/img/int1.png';
import int2 from '@src/static/img/int2.png';
import int3 from '@src/static/img/int3.png';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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
    cursor: 'pointer',
  },
  textTitle: { fontSize: '1.1 rem', fontWeight: 500, marginTop: 3, color: '#222222' },
}));
const InterestCarousel: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Carousel responsive={responsive} draggable arrows={false} partialVisible>
      <Box px={1} height="100%">
        <Link href="/interest">
          <CardMedia component="img" image={int3.src} className={classStyle.imgCover} />
        </Link>
        <Typography className={classStyle.textTitle}>กิจกรรมในกรุงเทพ</Typography>
      </Box>
      <Box px={1} height="100%">
        <Link href="/interest">
          <CardMedia component="img" image={int1.src} className={classStyle.imgCover} />
        </Link>
        <Typography className={classStyle.textTitle}>แอดเวนเจอร์</Typography>
      </Box>

      <Box px={1} height="100%">
        <Link href="/interest">
          <CardMedia component="img" image={int2.src} className={classStyle.imgCover} />
        </Link>
        <Typography className={classStyle.textTitle}>ใกล้ชิดสัตว์</Typography>
      </Box>
    </Carousel>
  );
};

export default InterestCarousel;
