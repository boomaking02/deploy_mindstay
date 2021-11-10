import React from 'react';
import { Box, Grid, Typography, CardMedia } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
// import Image from 'next/image';
import { ResortProps } from '@src/models/resort.model';
import ImageSlider from './ImageSlider';

type ResortDetailProps = {
  resort: ResortProps;
  handleOpenDialog: (resortId: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0, 3, 2),
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
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
        height: '2px',
        margin: theme.spacing(3, 0),
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
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

const Resort: React.FC<ResortDetailProps> = ({ resort, handleOpenDialog }: ResortDetailProps) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <ImageSlider resortId={resort.id} images={resort.images} handleOpenDialog={handleOpenDialog} />
          </Grid>
          <Grid item xs={12} sm={5} className={classes.resortDetail}>
            <Box>
              <Box className={classes.resortName}>
                <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
                  {resort.name}
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ fontSize: '1rem' }} alignItems="center">
                {resort.resortProperties
                  ?.filter((i) => i.type === 'area of use')
                  .map((item) => {
                    return (
                      <Grid item xs={6} key={item.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CardMedia component="img" image={item.image} sx={{ width: '30px', mr: 1 }} />
                          {item.name}
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
            <Box className={classes.resortPrice}>
              <Box>
                <Typography variant="h6">ราคาเริ่มต้น</Typography>
              </Box>
              <Box fontWeight="bold" mr="0.5rem">
                THB {resort.rooms.length ? resort.rooms[0].reservationPrice.toLocaleString() : 0} / คืน
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Resort;
