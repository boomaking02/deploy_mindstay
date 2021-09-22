import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Container,
  Grid,
  Dialog,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { createStyles, makeStyles } from '@mui/styles';
import BedFilter from '@src/components/BedFilter';
import PaginationComp from '@src/components/PaginationComp';
import PetFilter from '@src/components/PetFilter';
import PriceFilter from '@src/components/PriceFilter';
import QrCodeFilter from '@src/components/QrCodeFilter';
import Resort from '@src/components/Resort';
import ResortFilter from '@src/components/ResortFilter';
import Room from '@src/components/Room';
import TypeFilter from '@src/components/TypeFilter';

interface IResort {
  id: number;
  name: string;
  bedroom: number;
  bathroom: number;
  price: number;
}

const t = [
  {
    id: 1,
    label: 'เกาะช้าง',
  },
  {
    id: 2,
    label: 'พัทยา',
  },
  {
    id: 3,
    label: 'เกาะช้าง',
  },
  {
    id: 4,
    label: 'เกาะช้าง',
  },
  {
    id: 5,
    label: 'เกาะช้าง',
  },
];

const p = [
  {
    id: 1,
    label: '500 - 1,000 บาท',
  },
  {
    id: 2,
    label: '1,001 - 2,500 บาท ',
  },
  {
    id: 3,
    label: '2,501 - 4,000 บาท',
  },
  {
    id: 4,
    label: '4,001 - 10,000 บาท',
  },
  {
    id: 5,
    label: 'มากกว่า 10,000 บาท',
  },
];
const type = [
  {
    id: 1,
    label: 'ที่พักติดทะเล',
  },
  {
    id: 2,
    label: 'ที่พักติดทะเล',
  },
  {
    id: 3,
    label: 'ที่พักติดทะเล',
  },
  {
    id: 4,
    label: 'ที่พักติดทะเล',
  },
  {
    id: 5,
    label: 'ที่พักติดทะเล',
  },
];

const resorts = [
  {
    id: 1,
    name: 'Villa',
    bedroom: 1,
    bathroom: 1,
    price: 2000,
  },
  {
    id: 2,
    name: 'Vill2',
    bedroom: 2,
    bathroom: 2,
    price: 3000,
  },
];

const rooms = [
  {
    id: 1,
    name: 'Twin Villa',
    guest: 2,
    price: 2000,
  },
  {
    id: 2,
    name: 'Superior Villa',
    guest: 2,
    price: 2400,
  },
  {
    id: 3,
    name: 'Deluxe Villa',
    guest: 2,
    price: 3500,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResortList: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openFilter, setFilterOpen] = useState(false);
  const [resortSelected, setResortSelected] = useState<IResort | undefined>(undefined);

  const handleOpenDialog = (resortId: number): void => {
    const resort = resorts.find((item) => item.id === resortId);
    setResortSelected(resort);
    setOpen(true);
  };
  const handleOpenFilterDialog = () => {
    setFilterOpen(true);
  };
  const handleCloseFilterDialog = () => {
    setFilterOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const filterContent = (
    <Box>
      <QrCodeFilter />
      <ResortFilter title="จังหวัด" items={t} inputType="checkbox" />
      <PriceFilter title="ราคา" items={p} />
      <PetFilter title="สัตว์เลี้ยง" />
      <TypeFilter title="ประเภทประสบการณ์" items={type} inputType="checkbox" />
      <BedFilter title="ประเภทเตียง" />
    </Box>
  );
  return (
    <Container fixed sx={{ fontFamily: 'Prompt' }}>
      <Box fontWeight="fontWeightMeduim" fontSize="h5.fontSize" my={6} mt={13}>
        สถานที่พักผ่อนเกร๋ๆ ทั่วประเทศไทย ทางเราได้รวมมาให้คุณได้เลือกแล้ว
      </Box>
      <Grid container spacing={2}>
        <Hidden mdDown>
          <Grid item md={3}>
            {filterContent}
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Button
              size="large"
              onClick={handleOpenFilterDialog}
              fullWidth
              variant="outlined"
              startIcon={<FilterListIcon />}
            >
              ค้นหา
            </Button>
          </Grid>
        </Hidden>
        <Grid item md={9}>
          {resorts.map((resort) => (
            <Resort resort={resort} key={resort.id} handleOpenDialog={handleOpenDialog} />
          ))}
        </Grid>
      </Grid>
      <PaginationComp count={10} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{ fontFamily: 'Prompt' }}
      >
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {resortSelected?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Container fixed>
            <Box fontSize="h4.fontSize" fontWeight="bold" mt={4}>
              เลือกประเภทห้องพักของรีสอร์ท
            </Box>
            <Box>
              {rooms.map((room) => {
                return <Room room={room} key={room.id} />;
              })}
            </Box>
          </Container>
        </Box>
      </Dialog>
      <Dialog
        fullScreen
        open={openFilter}
        onClose={handleCloseFilterDialog}
        TransitionComponent={Transition}
        sx={{ fontFamily: 'Prompt' }}
      >
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <IconButton edge="start" color="inherit" onClick={handleCloseFilterDialog} aria-label="close">
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title} align="right">
                ล้าง
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box>
          <Container fixed>{filterContent}</Container>
        </Box>
      </Dialog>
    </Container>
  );
};

export default ResortList;
