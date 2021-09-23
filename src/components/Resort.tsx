import React from 'react';
import { Box, Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Image from 'next/image';
import bathIcon from '@public/static/img/icon/baht.png';
import ImageSlider from './ImageSlider';

type ResortProps = {
  resort: { id: number; name: string; bedroom: number; bathroom: number; image?: Array<string>; price: number };
  handleOpenDialog: (resortId: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0, 3, 2),
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      '&:last-child': {
        borderBottom: 0,
      },
    },
    imgCover: {
      objectFit: 'cover',
      borderRadius: 5,
      pointerEvents: 'none',
    },
    resortDetail: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(3),
      fontSize: '1.3rem',
    },
    resortName: {
      '&:after': {
        content: '""',
        display: 'block',
        width: '60px',
        height: '1px',
        margin: theme.spacing(3, 0),
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
      },
    },
    resortRoom: {
      color: '#867F7F',
    },
    resortPrice: {
      display: 'flex',
      '& span': {
        width: '25px',
        marginRight: theme.spacing(0.5),
      },
    },
    price: {
      fontWeight: 'bold',
    },
  })
);

const Resort: React.FC<ResortProps> = ({ resort, handleOpenDialog }: ResortProps) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <ImageSlider resort={resort} handleOpenDialog={handleOpenDialog} />
          </Grid>
          <Grid item xs={12} sm={5} className={classes.resortDetail}>
            <Box>
              <Box className={classes.resortName}>{resort.name}</Box>
              <Box className={classes.resortRoom}>
                {resort.bedroom} เตียง {resort.bathroom} ห้องน้ำ
              </Box>
            </Box>
            <Box className={classes.resortPrice}>
              <Box width="25px" mr="0.5rem">
                <Image src={bathIcon} alt="icon" />
              </Box>
              <Box fontWeight="bold" mr="0.5rem">
                {resort.price.toLocaleString()}
              </Box>
              / คืน
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Resort;
