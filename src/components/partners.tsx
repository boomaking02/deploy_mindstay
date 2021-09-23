import React from 'react';
import { Box, CardMedia, Button, Grid } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import 'react-multi-carousel/lib/styles.css';
import partner1 from '@src/static/img/partner1.png';
import partner2 from '@src/static/img/partner2.png';
import partner3 from '@src/static/img/partner3.png';
import partner4 from '@src/static/img/partner4.png';
import partner5 from '@src/static/img/partner5.png';
import partner6 from '@src/static/img/partner6.png';
import partner7 from '@src/static/img/partner7.png';
import partner8 from '@src/static/img/partner8.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardImage: {
      height: theme.spacing(10),
    },
    cardImageMobile: {
      height: theme.spacing(15),
    },
  })
);
const Partners: React.FC = () => {
  const classStyle = useStyles();
  return (
    <>
      {/* mobile */}
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner1.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner2.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner3.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner4.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner5.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner6.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner7.src} className={classStyle.cardImageMobile} />
          </Grid>
          <Grid item xs={6}>
            <CardMedia component="img" image={partner8.src} className={classStyle.cardImageMobile} />
          </Grid>
        </Grid>
      </Box>
      {/* desktop */}
      <Box sx={{ mb: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Box mx={6}>
          <CardMedia component="img" image={partner1.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner2.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner3.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner4.src} className={classStyle.cardImage} />
        </Box>
      </Box>
      <Box sx={{ mb: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Box mx={6}>
          <CardMedia component="img" image={partner5.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner6.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner7.src} className={classStyle.cardImage} />
        </Box>
        <Box mx={6}>
          <CardMedia component="img" image={partner8.src} className={classStyle.cardImage} />
        </Box>
      </Box>
      <Box sx={{ mb: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Button color="primary" variant="contained" size="large">
          ดูเพิ่มเติม
        </Button>
      </Box>
    </>
  );
};

export default Partners;
