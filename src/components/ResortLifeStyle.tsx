import React from 'react';
import { Box, Grid } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/link';
import { ResortProps } from '@src/models/resort.model';
import bathIcon from '@src/static/img/icon/baht.png';
import ImageSlider from './ImageSlider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0, 3, 2),
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      '&:last-child': {
        borderBottom: 0,
      },
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

const ResortLifeStyle: React.FC<ResortProps> = ({ ...resort }: ResortProps) => {
  const min = Math.min(...resort.rooms?.map((room) => room.reservationPrice));
  const max = Math.max(...resort.rooms?.map((room) => room.reservationPrice));
  const classes = useStyles();
  let minPrice = 0;
  let maxPrice = 0;
  if (min !== Number.POSITIVE_INFINITY && max !== Number.NEGATIVE_INFINITY) {
    minPrice = min;
    maxPrice = max;
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={7}>
          <ImageSlider
            resortId={resort.id}
            images={resort.images}
            handleOpenDialog={() => {
              throw new Error('Function not implemented.');
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Link href="/product">
            <Box className={classes.resortDetail}>
              <Box>
                <Box>{resort.name}</Box>
                <Box color="#867F7F">{resort.resortTags?.join(' ')}</Box>
              </Box>
              <Box className={classes.resortPrice}>
                <Box width="25px" mr="0.5rem">
                  <Image src={bathIcon} alt="icon" />
                </Box>
                <Box fontWeight="bold" mr="0.5rem">
                  {minPrice && maxPrice ? `${minPrice.toLocaleString()} - ${max.toLocaleString()}` : ''}
                </Box>
                / คืน
              </Box>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResortLifeStyle;
