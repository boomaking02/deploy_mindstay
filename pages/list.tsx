import https from 'https';
import React, { useState, useEffect } from 'react';
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
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import PaginationComp from '@src/components/PaginationComp';
import QrCodeFilter from '@src/components/QrCodeFilter';
import Resort from '@src/components/Resort';
import ResortFilter from '@src/components/ResortFilter';
import Room from '@src/components/Room';
import { PaginationProps } from '@src/models/pagination.model';
import { ResortProps, ResortTagProps, ResortZoneProps } from '@src/models/resort.model';
import { RoomProps } from '@src/models/room.model';
import Api from '@src/services/api';
import { bedList, petList, priceList } from '@src/utils/filterData';

type ResortListProps = {
  resorts: { items: Array<ResortProps>; meta: PaginationProps };
  resortZones: Array<ResortZoneProps>;
  resortTags: Array<ResortTagProps>;
};

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
const ResortListPage: React.FC<ResortListProps> = ({ ...props }: ResortListProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<Array<RoomProps>>([]);
  const [resortSelected, setResortSelected] = useState<ResortProps | undefined>(undefined);
  const [openFilter, setFilterOpen] = useState(false);
  const [queryParams, setQueryParams] = useState({});
  const { resorts, resortTags, resortZones } = props;

  useEffect(() => {
    const { query } = router;
    setQueryParams(query);
  }, [router]);

  const handleOpenDialog = async (resortId: number) => {
    const resort = resorts.items?.find((item) => item.id === resortId);
    setResortSelected(resort);
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/room?isActive=1&resort=${resort?.id}`, {
      httpsAgent: agent,
    });
    setRooms(response.data);
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

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (event) {
      const { query } = router;
      const newQuery: { [key: string]: string | number } = {
        ...query,
        page,
      };

      const queryString = Object.keys(newQuery)
        .map((key) => {
          return `${key}=${newQuery[key]}`;
        })
        .join('&');

      router.replace(`/list?${queryString}`);
    }
  };

  const onFilter = (q: string, searchParams: string, isCheck: boolean, inputType: string) => {
    const { query } = router;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentValue: any = query[searchParams];
    let newValue = null;
    if (isCheck) {
      newValue = currentValue && inputType !== 'radio' ? `${currentValue},${q}` : q;
    } else {
      newValue = currentValue
        ?.split(',')
        .filter((k: string) => k !== q)
        .join(',');
    }

    const newQuery = {
      ...query,
      [searchParams]: newValue,
    };
    delete newQuery.page;
    const queryString = Object.keys(newQuery)
      .map((key) => {
        return `${key}=${newQuery[key]}`;
      })
      .join('&');

    router.replace(`/list?${queryString}`);
  };

  const filterContent = (
    <Box>
      <QrCodeFilter />
      <ResortFilter
        title="จังหวัด"
        items={resortZones}
        inputType="checkbox"
        searchParams="resortZones"
        column={6}
        onFilter={onFilter}
        queryParams={queryParams}
      />
      <ResortFilter
        title="ราคา"
        items={priceList}
        inputType="radio"
        searchParams="price"
        column={12}
        onFilter={onFilter}
        queryParams={queryParams}
      />
      <ResortFilter
        title="สัตว์เลี้ยง"
        items={petList}
        inputType="radio"
        searchParams="isPetAllowed"
        column={6}
        onFilter={onFilter}
        queryParams={queryParams}
      />
      <ResortFilter
        title="ประเภทประสบการณ์"
        items={resortTags}
        inputType="checkbox"
        searchParams="resortTags"
        column={6}
        onFilter={onFilter}
        queryParams={queryParams}
      />
      <ResortFilter
        title="ประเภทเตียง"
        items={bedList}
        inputType="checkbox"
        searchParams="bed"
        column={6}
        onFilter={onFilter}
        queryParams={queryParams}
      />
    </Box>
  );
  return (
    <Container maxWidth="xl" sx={{ fontFamily: 'Prompt' }}>
      <Box sx={{ mx: { xs: 0, md: 7 } }}>
        <Box fontWeight="fontWeightMeduim" fontSize="h5.fontSize" mt={13}>
          <Typography component="span" variant="h5" fontWeight="bold" sx={{ fontFamily: 'Prompt' }}>
            รีสอร์ท/โรงแรม/วิลล่า
          </Typography>{' '}
          สวยๆ ยูนิคๆ ทั่วประเทศไทย ทางเรารวบรวมมาให้คุณพร้อมเปรียบเทียบแล้ว
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
            {resorts.items?.map((resort) => (
              <Resort resort={resort} key={resort.id} handleOpenDialog={handleOpenDialog} />
            ))}
          </Grid>
        </Grid>
        <PaginationComp count={resorts.meta.totalPages} page={resorts.meta.currentPage} onPageChange={onPageChange} />
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
          sx={{ fontFamily: 'Bai Jamjuree' }}
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
              <Grid container>
                <Grid item xs={12}>
                  <Box mt={4}>
                    <Typography
                      align="center"
                      variant="h5"
                      color="primary"
                      sx={{ fontWeight: 'bold', fontFamily: 'Prompt' }}
                    >
                      ทุกห้องพักด้านล่างมีรีวิวรีสอร์ทโดยรวมให้รับชม!!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box fontSize="h5.fontSize" fontWeight="bold" mt={4} sx={{ fontFamily: 'Prompt' }}>
                    โปรดเลือกประเภทห้องพัก
                  </Box>
                </Grid>
              </Grid>

              <Box>
                {rooms.map((room) => {
                  return <Room {...room} key={room.id} />;
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
          sx={{ fontFamily: 'Bai Jamjuree' }}
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
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const queryParams = Object.keys(context.query)
      .map((key) => {
        return `${key}=${context.query[key] ? context.query[key] : ''}`;
      })
      .join('&');
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/resort/lowestPrice?isActive=true&${queryParams}`, { httpsAgent: agent });
    const resortZones = await Api.get('/resort-zone?isActive=true', { httpsAgent: agent });
    const resortTags = await Api.get('/resort-tag?isActive=true', { httpsAgent: agent });
    return {
      props: {
        resorts: response.data,
        resortZones: resortZones.data?.items,
        resortTags: resortTags.data?.items,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ResortListPage;
