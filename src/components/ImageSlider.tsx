import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, CardMedia, Hidden } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import image1 from '@public/static/img/test1.png';

type ResortProps = {
  resort: { id: number; name: string; bedroom: number; bathroom: number; image?: Array<string>; price: number };
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
    items: 2,
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
const ImageSlider: React.FC<ResortProps> = ({ resort, handleOpenDialog }: ResortProps) => {
  const classes = useStyles();

  return (
    <>
      <Hidden mdUp>
        <CardMedia component="img" image={image1.src} className={classes.imgCover} />
      </Hidden>
      <Hidden mdDown>
        <Carousel
          responsive={responsive}
          showDots
          swipeable
          draggable
          ssr
          infinite
          removeArrowOnDeviceType={['tablet', 'mobile']}
          renderDotsOutside={false}
          partialVisible
          // warning custom arrow
          customLeftArrow={<ChevronLeftIcon className={classes.arrow} sx={{ left: 20 }} />}
          customRightArrow={<ChevronRightIcon className={classes.arrow} sx={{ right: 20 }} />}
        >
          <Box px={1} height="100%" onClick={() => handleOpenDialog(resort.id)} sx={{ cursor: 'pointer' }}>
            <CardMedia component="img" image={image1.src} className={classes.imgCover} />
          </Box>
        </Carousel>
      </Hidden>
    </>
  );
};

export default ImageSlider;
