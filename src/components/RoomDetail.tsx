import React from 'react';
import { Grid, Box } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import room1 from '@src/static/img/room1.png';

type RoomProps = {
  room: { id: number; name: string; bed: number; bathroom: number; price: number };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    roomImage: {
      height: '110px',
      backgroundImage: `url(${room1.src})`,
      borderRadius: '20px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    roomDetail: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(1),
      fontSize: '1 rem',
    },
    roomName: {
      '&:after': {
        content: '""',
        display: 'block',
        width: '60px',
        height: '1px',
        margin: theme.spacing(1, 0),
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
      },
    },
    room: {
      color: '#867F7F',
    },
    roomPrice: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        width: '25px',
        marginRight: theme.spacing(0.5),
      },
    },
  })
);

const RoomDetail: React.FC<RoomProps> = ({ room }: RoomProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={5}>
        <Box className={classes.roomImage} />
      </Grid>
      <Grid item sm={7} className={classes.roomDetail}>
        <Box>
          <Box className={classes.roomName}>{room.name}</Box>
          <Box className={classes.room}>
            {room.bed} เตียง {room.bathroom} ห้องน้ำ
          </Box>
        </Box>
        <Box>
          <Box textAlign="right">ราคาเริ่มต้น</Box>
          <Box className={classes.roomPrice}>
            <Box width="25px" mr="0.5rem" />
            <Box fontWeight="bold" mr="0.5rem">
              {room.price.toLocaleString()}
            </Box>
            / คืน
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RoomDetail;
