import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, CardMedia, Hidden } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type ImageSliderProps = {
  resortId: number;
  images?: Array<string>;
  handleOpenDialog: (resortId: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrow: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      bottom: 20,
      width: 35,
      height: 35,
      cursor: 'pointer',
      borderRadius: '50%',
      border: '2px solid',
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      backgroundColor: 'white',
    },
    imgCover: {
      objectFit: 'cover',
      borderRadius: 5,
      pointerEvents: 'none',
      maxHeight: '300px',
    },
  })
);
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
  },
};
const ImageSlider: React.FC<ImageSliderProps> = ({ resortId, images, handleOpenDialog }: ImageSliderProps) => {
  const classes = useStyles();

  return (
    <>
      <Hidden mdUp>
        <Box onClick={() => handleOpenDialog(resortId)} sx={{ cursor: 'pointer' }}>
          <CardMedia component="img" image={images && images[0]} className={classes.imgCover} />
        </Box>
      </Hidden>
      <Hidden mdDown>
        <Carousel
          responsive={responsive}
          showDots
          swipeable
          draggable
          renderDotsOutside={false}
          // warning custom arrow
          customLeftArrow={<ChevronLeftIcon className={classes.arrow} sx={{ left: 20 }} />}
          customRightArrow={<ChevronRightIcon className={classes.arrow} sx={{ right: 20 }} />}
        >
          {images?.map((image) => {
            return (
              <Box
                px={1}
                height="100%"
                onClick={() => handleOpenDialog(resortId)}
                sx={{ cursor: 'pointer' }}
                key={image}
              >
                <CardMedia component="img" image={image} className={classes.imgCover} />
              </Box>
            );
          })}
        </Carousel>
      </Hidden>
    </>
  );
};

export default ImageSlider;
