import React from 'react';
import { Grid, Box } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { RoomProps } from '@src/models/room.model';

type StyleProps = {
  images?: Array<string>;
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {},
    roomImage: {
      height: '110px',
      backgroundImage: ({ images }) => (images?.length ? `url(${images[0]})` : 'none'),
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

const RoomDetail: React.FC<RoomProps> = ({ ...props }: RoomProps) => {
  const classes = useStyles({ images: props.images });
  return (
    <Grid container>
      <Grid item xs={5}>
        <Box className={classes.roomImage} />
      </Grid>
      <Grid item xs={7} className={classes.roomDetail}>
        <Box>
          <Box className={classes.roomName}>{props.name}</Box>
          <Box className={classes.room}>
            {props.bed} เตียง {props.bathroom} ห้องน้ำ
          </Box>
        </Box>
        <Box>
          <Box textAlign="right">ราคาเริ่มต้น</Box>
          <Box className={classes.roomPrice}>
            <Box width="25px" mr="0.5rem" />
            <Box fontWeight="bold" mr="0.5rem">
              {props.reservationPrice.toLocaleString()}
            </Box>
            / คืน
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RoomDetail;
