import React from 'react';
import { Box, CardMedia, Link, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ResortCategoryProps } from '@src/models/resort.model';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 40,
  },
};

type LifeStyleProps = {
  liftStyles: Array<ResortCategoryProps>;
};

const useStyles = makeStyles(() => ({
  imgCover: { height: 'auto', objectFit: 'cover', borderRadius: 5, pointerEvents: 'none' },
  textTitle: { fontSize: '1.1 rem', fontWeight: 500, marginTop: 1, color: '#222222' },
  link: { textDecoration: 'none' },
}));

const LifeStyleCarousel: React.FC<LifeStyleProps> = ({ ...props }: LifeStyleProps) => {
  const classStyle = useStyles();
  return (
    <Carousel responsive={responsive} arrows={false} swipeable draggable partialVisible centerMode={false}>
      {props.liftStyles.map((style) => {
        return (
          <Box px={1} height="100%" key={style.id}>
            <Link href={`/life-style?resortCategories=${style.id}`} className={classStyle.link}>
              <CardMedia component="img" image={style.image} className={classStyle.imgCover} />
              <Typography align="center" className={classStyle.textTitle}>
                {style.name}
              </Typography>
            </Link>
          </Box>
        );
      })}
    </Carousel>
  );
};

export default LifeStyleCarousel;
