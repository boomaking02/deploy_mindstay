import React from 'react';
import { People } from '@mui/icons-material';
import { Box, Button, Grid, Link } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import classNames from 'classnames';
import room1 from '@public/static/img/room1.png';
import room2 from '@public/static/img/room2.png';
import room3 from '@public/static/img/room3.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5, 0),
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      fontSize: '1.5rem',
      '&:last-child': {
        borderBottom: 0,
      },
    },
    roomDetailWrapper: {
      paddingLeft: theme.spacing(4),
    },
    roomDetail: {
      fontSize: '1.2rem',
      padding: theme.spacing(0, 2),
      marginBottom: theme.spacing(2),
    },
    line: {
      paddingBottom: theme.spacing(2),
      borderBottom: '1px solid #867F7F',
    },
    selectButton: {
      borderRadius: '10px',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    bgImage: {
      height: '150px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    imgTop: {
      backgroundImage: `url(${room1.src})`,
      borderTopRightRadius: '20px',
      borderTopLeftRadius: '20px',
    },
    imgLeft: {
      backgroundImage: `url(${room2.src})`,
      width: '50%',
      borderBottomLeftRadius: '20px',
      marginRight: theme.spacing(0.5),
    },
    imgRight: {
      backgroundImage: `url(${room3.src})`,
      width: '50%',
      borderBottomRightRadius: '20px',
    },
    imageWrapper: {},
  })
);

type RoomProps = {
  room: { id: number; name: string; guest: number; price: number };
};

const Room: React.FC<RoomProps> = ({ room }: RoomProps) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Box fontWeight="bold" mb={2}>
          {room.name}
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box className={classNames(classes.bgImage, classes.imgTop)} />
              <Box display="flex" mt={0.5}>
                <Box className={classNames(classes.bgImage, classes.imgLeft)} />
                <Box className={classNames(classes.bgImage, classes.imgRight)} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} className={classes.roomDetailWrapper}>
              <Box fontWeight="bold" mb={3} px={2}>
                {room.name}
              </Box>
              <Grid container className={classNames(classes.roomDetail, classes.line)}>
                <Grid item sm={5}>
                  เตียงคู่
                </Grid>
                <Grid item sm={3}>
                  <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <People /> {room.guest} ผู้เข้าพัก
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box color="primary.main" textAlign="right">
                    (5 ห้องว่าง)
                  </Box>
                </Grid>
              </Grid>
              <Grid container className={classes.roomDetail}>
                <Grid item sm={5}>
                  <Box>อาหารเช้าฟรี 2 ท่าน</Box>
                  <Box>Wifi ฟรี</Box>
                </Grid>
                <Grid item sm={3}>
                  <Box color="#808080">ไม่สามารถคืนเงินได้</Box>
                </Grid>
                <Grid item sm={4}>
                  <Box textAlign="right">
                    <Box fontSize="1rem">ราคาเริ่มต้น</Box>
                    <Box color="primary.main" fontWeight="bold" fontSize="1.5rem">
                      {room.price.toLocaleString()}
                    </Box>
                    <Box color="primary.main">/ คืน</Box>
                    <Box fontSize="0.75rem">รวมภาษีแล้ว</Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container className={classes.roomDetail}>
                <Grid item sm={12}>
                  <Box textAlign="right" mt={4}>
                    <Link href="/product">
                      <Button color="primary" variant="contained" className={classes.selectButton}>
                        เลือก
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Room;
