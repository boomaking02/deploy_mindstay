import https from 'https';
import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Paper,
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  ButtonGroup,
  Button,
  Grid,
  Chip,
  CardMedia,
  Divider,
  Link,
  Breadcrumbs,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import RoomHost from '@src/components/HostComponent/room';
import { ResortProps } from '@src/models/resort.model';
import { RoomProps } from '@src/models/room.model';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';
import firebaseConfig from '@src/utils/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(10),
      backgroundColor: '#f7f8f9 !important',
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 10,
      height: '100%',
    },
    cardBorder: { border: '2px solid #c7c4c4', borderRadius: 20 },
  })
);
interface HostProps {
  resort: ResortProps;
  room: RoomProps[];
}
const ResortHostDetail: React.FC<HostProps> = ({ resort, room }: HostProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const options = {
    buttons: { showAutoplayButton: false, showDownloadButton: false },
    thumbnails: {
      showThumbnails: false,
    },
    caption: {
      showCaption: false,
    },
  };
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [resortData] = useState<ResortProps | null>(resort);
  const [roomData] = useState<RoomProps[]>(room);
  const breadcrumbs = [
    <Link
      href={`/hostManagement/resort/${currentUser?.id}`}
      key="1"
      underline="hover"
      color="inherit"
      sx={{ cursor: 'pointer', fontFamily: 'Prompt' }}
    >
      Resort
    </Link>,
    <Typography key="2" color="primary" fontFamily="Prompt">
      Resort Detail
    </Typography>,
  ];
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      if (user) {
        const response = await Api.get(`/user?uid=${user.uid}`, { httpsAgent: agent });
        setCurrentUser(response.data.items[0]);
        const findHost = Array.isArray(resort.hosts)
          ? resort.hosts.find((h: UserProps) => response.data.items[0].id === h.id)
          : undefined;
        if (response.data.items[0].role !== 'host' || !findHost) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    });
  }, [resort.hosts, router]);
  return (
    <>
      <SimpleReactLightbox>
        <Paper className={classStyle.paper}>
          <Container fixed>
            <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
              Host Management
            </Typography>
            <Box sx={{ my: 2, backgroundColor: '#272727', borderRadius: 2, boxShadow: 2 }}>
              <ButtonGroup fullWidth disableElevation variant="text" color="inherit">
                <Button href={`/hostManagement/${currentUser?.id}`} size="large">
                  <Typography
                    noWrap
                    variant="body1"
                    align="center"
                    sx={{ color: 'white', fontFamily: 'Prompt', fontWeight: 400, py: 2 }}
                  >
                    Dashboard
                  </Typography>
                </Button>
                <Button href={`/hostManagement/resort/${currentUser?.id}`} size="large">
                  <Typography
                    noWrap
                    variant="body1"
                    align="center"
                    sx={{ color: 'white', fontFamily: 'Prompt', fontWeight: 400, py: 2 }}
                  >
                    Resort
                  </Typography>
                </Button>
              </ButtonGroup>
            </Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            <Card sx={{ width: '100%', my: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                  ข้อมูลสถานที่
                </Typography>
                <Box sx={{ m: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Typography fontWeight="bold">ชื่อสถานที่ : </Typography>
                        <Typography>{resortData?.name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography fontWeight="bold">สถานะ : </Typography>
                          <Chip
                            label={resortData?.isActive ? 'Active' : 'Inactive'}
                            color={resortData?.isActive ? 'success' : 'error'}
                            sx={{ color: 'white', fontWeight: 'bold' }}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Typography fontWeight="bold">ประเภท : </Typography>
                        <Typography>{resortData?.resortType?.name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Typography fontWeight="bold">อนุญาตสัตว์เลี้ยง : </Typography>
                        <Typography>{resortData?.isPetAllowed ? 'อนุญาต' : 'ไม่อนุญาต'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ mb: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        ไลฟ์สไตล์ที่พัก :{' '}
                      </Typography>
                      {resortData?.resortCategories &&
                        resortData?.resortCategories?.map((data) => {
                          return <Chip key={data.id} label={data.name} sx={{ mx: 1, fontWeight: 'bold' }} />;
                        })}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        จังหวัด :{' '}
                      </Typography>
                      {resortData?.resortZones &&
                        resortData?.resortZones?.map((data) => {
                          return <Chip key={data.id} label={data.name} sx={{ mx: 1, fontWeight: 'bold' }} />;
                        })}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        ประเภทประสบการณ์ :{' '}
                      </Typography>
                      {resortData?.resortTags &&
                        resortData?.resortTags?.map((data) => {
                          return <Chip key={data.id} label={data.name} sx={{ mx: 1, fontWeight: 'bold' }} />;
                        })}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', my: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                  รูปภาพสถานที่
                </Typography>
                <Box sx={{ m: 2 }}>
                  <SRLWrapper options={options}>
                    <Grid container spacing={2}>
                      {resortData?.images &&
                        resortData?.images.map((img) => {
                          return (
                            <Grid item xs={12} md={3} key={img}>
                              <CardMedia component="img" image={img} sx={{ maxHeight: '100px', cursor: 'pointer' }} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </SRLWrapper>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', my: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                  ห้อง
                </Typography>
                <Box sx={{ m: 2 }}>
                  <Box sx={{ my: 2 }}>
                    <Button
                      href={`/hostManagement/room/addRoom/${resortData?.id}`}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Add Room
                    </Button>
                  </Box>
                  <RoomHost rooms={roomData} />
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Paper>
      </SimpleReactLightbox>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/resort/${query?.id}`, { httpsAgent: agent });
    const responseRoom = await Api.get(`/room?resort=${query?.id}`, { httpsAgent: agent });

    return {
      props: {
        resort: response.data,
        room: responseRoom.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
export default ResortHostDetail;
