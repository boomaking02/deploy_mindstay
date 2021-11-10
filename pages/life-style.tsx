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
import ResortFilter from '@src/components/ResortFilter';
import ResortLifeStyle from '@src/components/ResortLifeStyle';
import RoomDetail from '@src/components/RoomDetail';
import { PaginationProps } from '@src/models/pagination.model';
import { ResortProps, ResortTagProps, ResortZoneProps } from '@src/models/resort.model';
import Api from '@src/services/api';
import { bedList, petList, priceList } from '@src/utils/filterData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    resortWrapper: {
      padding: theme.spacing(0, 3, 3, 3),
      marginBottom: theme.spacing(3),
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      '&:last-child': {
        borderBottom: 0,
        marginBottom: 0,
      },
    },
    recommendWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
);

type ResortListProps = {
  resorts: { items: Array<ResortProps>; meta: PaginationProps };
  resortZones: Array<ResortZoneProps>;
  resortTags: Array<ResortTagProps>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LifeStyle: React.FC<ResortListProps> = ({ ...props }: ResortListProps) => {
  const { resorts, resortTags, resortZones } = props;
  const router = useRouter();
  const classes = useStyles();
  const [queryParams, setQueryParams] = useState({});
  const [openFilter, setFilterOpen] = useState(false);

  useEffect(() => {
    const { query } = router;
    setQueryParams(query);
  }, [router]);

  const handleOpenFilterDialog = () => {
    setFilterOpen(true);
  };
  const handleCloseFilterDialog = () => {
    setFilterOpen(false);
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

      router.replace(`/life-style?${queryString}`);
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

    router.replace(`/life-style?${queryString}`);
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
    <Container fixed sx={{ fontFamily: 'Prompt', mt: 13 }}>
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
          <Grid container>
            <Grid item md={8}>
              <Box fontWeight="bold" fontSize="h5.fontSize" mb={3} pl={3}>
                ไลฟ์สไตล์
              </Box>
            </Grid>
            <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box fontWeight="bold" fontSize="h5.fontSize" mb={3} pr={3}>
                ประเภทห้องนิยม
              </Box>
            </Grid>
            <Grid item xs={12}>
              {resorts.items?.map((resort) => {
                return (
                  <Grid container className={classes.resortWrapper} spacing={1} key={resort.id}>
                    <Grid item xs={12} md={8}>
                      <ResortLifeStyle {...resort} />
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.recommendWrapper}>
                      {resort?.rooms
                        ?.filter((room) => room.isRecommend)
                        .map((recommend) => {
                          return (
                            <>
                              <Hidden mdUp>
                                <Box fontWeight="bold" fontSize="h5.fontSize" mb={3} pr={3}>
                                  ประเภทห้องนิยม
                                </Box>
                              </Hidden>
                              <RoomDetail {...recommend} key={recommend.id} />
                            </>
                          );
                        })}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PaginationComp count={resorts.meta.totalPages} page={resorts.meta.currentPage} onPageChange={onPageChange} />
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
    const response = await Api.get(`/resort/lowestPrice?isActive=true&isRecommend=true&${queryParams}`, {
      httpsAgent: agent,
    });
    const resortZones = await Api.get('/resort-zone?isActive=true', { httpsAgent: agent });
    const resortTags = await Api.get('/resort-tag?isActive=true', { httpsAgent: agent });
    return {
      props: {
        resorts: response.data,
        resortZones: resortZones.data?.items,
        resortTags: resortTags.data?.items,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default LifeStyle;
