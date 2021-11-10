import React from 'react';
import KingBedIcon from '@mui/icons-material/KingBed';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import { Box, Button, Grid, Link, CardMedia, Stack } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import classNames from 'classnames';
import { RoomProps } from '@src/models/room.model';
import room1 from '@src/static/img/room1.png';
import room2 from '@src/static/img/room2.png';
import room3 from '@src/static/img/room3.png';

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
      height: '200px',
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

const getBedTypeName = (type: string) => {
  const mapping: { [key: string]: string } = {
    'King Bed': 'เตียงคิงไซส์',
    'Queen Bed': 'เตียงควีนไซส์',
    'Double Bed': 'เตียงคู่',
    'Mattress Bed': 'เตียงฟูก',
  };
  return mapping[type];
};

const getBedTypeImage = (type: string) => {
  const mapping: { [key: string]: React.ReactNode } = {
    'King Bed': <KingBedIcon />,
    'Queen Bed': <SingleBedIcon />,
    'Double Bed': <KingBedIcon />,
    'Mattress Bed': <SingleBedIcon />,
  };

  return mapping[type];
};

const Room: React.FC<RoomProps> = ({ ...props }: RoomProps) => {
  const classes = useStyles();
  const guest = [];
  for (let i = 0; i < props.guest; i += 1) {
    guest.push(<PersonOutlineOutlinedIcon />);
  }
  return (
    <>
      <Box className={classes.root}>
        <Box fontWeight="bold" mb={2}>
          {props.name}
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box className={classNames(classes.bgImage, classes.imgTop)} />
              <Box display="flex" mt={0.5}>
                <Box className={classNames(classes.bgImage, classes.imgLeft)} />
                <Box className={classNames(classes.bgImage, classes.imgRight)} />
              </Box>
            </Grid>
            <Grid item xs={12} md={7} className={classes.roomDetailWrapper}>
              <Box fontWeight="bold" mb={3} px={2}>
                {props.name}
              </Box>
              <Grid container className={classNames(classes.roomDetail, classes.line)}>
                <Grid item sm={9}>
                  <Grid container spacing={2}>
                    {props.bedType?.map((type) => {
                      return (
                        <Grid item sm={4}>
                          <Box display="flex" justifyContent="flex-start" alignItems="center" fontSize="1rem">
                            {getBedTypeImage(type)} {getBedTypeName(type)}
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item sm={3}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    {guest.map((comp) => comp)}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ fontSize: '1rem' }} alignItems="center">
                {props.resortProperties
                  ?.filter((p) => p.type === 'facility')
                  .map((property) => {
                    return (
                      <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CardMedia component="img" image={property.image} sx={{ width: '30px', mr: 1 }} />
                          {property.name}
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid container className={classes.roomDetail}>
                <Grid item sm={12}>
                  <Stack direction="row" spacing={2} alignItems="center" mt={4}>
                    <Box fontSize="1.3rem" fontWeight="bold">
                      เริ่มต้น
                    </Box>
                    <Box color="primary.main" fontWeight="bold" fontSize="1.5rem">
                      THB {props.reservationPrice?.toLocaleString()}
                    </Box>
                    <Box fontSize="1.3rem" fontWeight="bold">
                      / คืน
                    </Box>
                    <Link href={`/room/${props.id}`}>
                      <Button color="primary" variant="contained" className={classes.selectButton}>
                        เลือก
                      </Button>
                    </Link>
                  </Stack>
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
