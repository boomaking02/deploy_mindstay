import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, CardMedia, Grid, Typography, Button } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import 'react-multi-carousel/lib/styles.css';
import classNames from 'classnames';
import boxImage from '@src/static/img/box.png';
import trip1 from '@src/static/img/trip1.png';
import trip2 from '@src/static/img/trip2.png';
import trip3 from '@src/static/img/trip3.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardImage: {
      height: theme.spacing(10),
    },
    cardImageMobile: {
      height: theme.spacing(15),
    },
    textTitle: {
      fontSize: '1.1 rem',
      fontWeight: 500,
      color: '#222222',
      fontFamily: 'Prompt',
    },
    bgImage: {
      height: '170px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    imgTop: {
      borderTopRightRadius: '20px',
      borderTopLeftRadius: '20px',
    },
    imgLeft: {
      width: '50%',
      borderBottomLeftRadius: '20px',
      marginRight: theme.spacing(0.5),
    },
    imgRight: {
      width: '50%',
      borderBottomRightRadius: '20px',
    },
  })
);
const TripBusiness: React.FC = () => {
  const classStyle = useStyles();
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <CardMedia component="img" image={boxImage.src} className={classStyle.cardImageMobile} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classStyle.textTitle} sx={{ my: 1 }}>
                  ฿2,500 - ฿3,500 ต่อคน
                </Typography>
                <Button color="primary" variant="contained" sx={{ borderRadius: '10px' }}>
                  <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
                    ดูรายละเอียดเพิ่มเติม
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography noWrap sx={{ fontSize: '1.5rem', color: '#484848', fontWeight: 500 }}>
                  The Best Travel Experiences
                </Typography>
                <Typography noWrap sx={{ fontSize: '1.1rem', fontWeight: 200, fontFamily: 'Prompt' }}>
                  ให้เราได้ดูแลทริปของพวกคุณ
                </Typography>

                <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Prompt', mt: 4 }}>
                  ทำไมคุณต้องทริปธุรกิจ ?
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: '0.5rem', mr: 2 }} />
                  <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Prompt' }}>
                    ได้รับประสบการณ์ที่คุณอาจไม่เคยรู้ว่ามีอยู่
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: '0.5rem', mr: 2 }} />
                  <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Prompt' }}>
                    กิจกรรมละลายพฤติกรรมที่เราออกแบบให้โดยเฉพาะ
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Prompt', ml: 3 }}>
                    จะทำให้คนของคุณปลดพันธนาการในเบื้องลึก
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: '0.5rem', mr: 2 }} />
                  <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 200, fontFamily: 'Prompt' }}>
                    ได้รับการมอนิเตอร์อย่างใกล้ชิดจากเรา
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={0} direction="column">
              <Grid item xs>
                <CardMedia
                  component="img"
                  image={trip1.src}
                  className={classNames(classStyle.bgImage, classStyle.imgTop)}
                />
                <Box display="flex" mt={0.5}>
                  <CardMedia
                    component="img"
                    image={trip2.src}
                    className={classNames(classStyle.bgImage, classStyle.imgLeft)}
                  />
                  <CardMedia
                    component="img"
                    image={trip3.src}
                    className={classNames(classStyle.bgImage, classStyle.imgRight)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TripBusiness;
