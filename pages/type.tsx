import React from 'react';
import { Container, Grid, Box } from '@mui/material/';
import { createTheme, styled } from '@mui/material/styles';
import PaginationComp from '@src/components/PaginationComp';
import ResortLifeStyle from '@src/components/ResortLifeStyle';
import RoomDetail from '@src/components/RoomDetail';

const theme = createTheme();

const PREFIX = 'Room';
const classes = {
  root: `${PREFIX}-root`,
  resortWrapper: `${PREFIX}-resortWrapper`,
  recommendWrapper: `${PREFIX}-recommendWrapper`,
};
const RootContainer = styled(Container)(() => ({
  [`&.${classes.root}`]: {
    paddingTop: theme.spacing(6),
  },
  [`&.${classes.resortWrapper}`]: {
    padding: theme.spacing(0, 3, 3, 3),
    marginBottom: theme.spacing(3),
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0,
    },
  },
  [`&.${classes.recommendWrapper}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const resorts = [
  {
    id: 1,
    name: 'Villa',
    bedroom: 1,
    bathroom: 1,
    tags: ['ติดทะเล', 'ติดภูเขา'],
    price: 2000,
    recommends: [
      {
        id: 1,
        name: 'Deluxe',
        bed: 1,
        bathroom: 1,
        price: 2000,
      },
      {
        id: 2,
        name: 'Deluxe Test',
        bed: 1,
        bathroom: 1,
        price: 3500,
      },
    ],
  },
  {
    id: 2,
    name: 'Vill2',
    bedroom: 2,
    bathroom: 2,
    tags: ['ติดทะเล', 'ติดภูเขา'],
    price: 3000,
    recommends: [
      {
        id: 1,
        name: 'Deluxe',
        bed: 1,
        bathroom: 1,
        price: 2000,
      },
    ],
  },
];

const LifeStyle: React.FC = () => {
  return (
    <RootContainer className={classes.root}>
      <Grid container>
        <Grid item sm={2}>
          Filter
        </Grid>
        <Grid item sm={10}>
          <Grid container>
            <Grid item sm={8}>
              <Box fontWeight="bold" fontSize="h5.fontSize" mb={3} pl={3}>
                ไลฟสไตล์
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box fontWeight="bold" fontSize="h5.fontSize" mb={3} pr={3}>
                ประเภทห้องนิยม
              </Box>
            </Grid>
            {resorts.map((resort) => (
              <Grid container className={classes.resortWrapper} spacing={1} key={resort.id}>
                <Grid item sm={8}>
                  <ResortLifeStyle resort={resort} />
                </Grid>
                <Grid item sm={4} className={classes.recommendWrapper}>
                  {resort?.recommends.map((recommend) => {
                    return <RoomDetail room={recommend} key={recommend.id} />;
                  })}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <PaginationComp count={10} />
    </RootContainer>
  );
};

export default LifeStyle;
