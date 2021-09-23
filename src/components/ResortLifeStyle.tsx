import React from 'react';
import { Box, Grid } from '@mui/material/';
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/link';
import bathIcon from '@src/static/img/icon/baht.png';

type LiftStyleProps = {
  resort: { id: number; name: string; tags: Array<string>; price: number };
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

const ResortLifeStyle: React.FC<LiftStyleProps> = ({ resort }: LiftStyleProps) => {
  const classes = useStyles();
  return (
    <Box>
      <Grid item sm={5} className={classes.resortDetail}>
        <Link href="/product">
          <Box>
            <Image src={bathIcon} alt="icon" />
            <Box>
              <Box>{resort.name}</Box>
              <Box color="#867F7F">{resort.tags?.join(' ')}</Box>
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
          </Box>
        </Link>
      </Grid>
    </Box>
  );
};

export default ResortLifeStyle;
