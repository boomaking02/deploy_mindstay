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
  room: RoomProps;
}
const RoomHostDetail: React.FC<HostProps> = ({ room }: HostProps) => {
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
  const [roomData] = useState<RoomProps>(room);
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
    <Link
      href={`/hostManagement/resort/resortDetail/${roomData?.resort?.id}`}
      key="1"
      underline="hover"
      color="inherit"
      sx={{ cursor: 'pointer', fontFamily: 'Prompt' }}
    >
      Resort Detail
    </Link>,
    <Typography key="2" color="primary" fontFamily="Prompt">
      Room Detail
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
      }
      //     const findHost = Array.isArray(room.hosts)
      //       ? room.hosts.find((h: UserProps) => response.data.items[0].id === h.id)
      //       : undefined;
      //     if (response.data.items[0].role !== 'host' || !findHost) {
      //       router.push('/');
      //     }
      //   } else {
      //     router.push('/');
      //   }
    });
  }, [room, router]);
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
                        <Typography fontWeight="bold">ชื่อห้อง : </Typography>
                        <Typography>{roomData?.name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography fontWeight="bold">สถานะ : </Typography>
                          <Chip
                            label={roomData?.isActive ? 'Active' : 'Inactive'}
                            color={roomData?.isActive ? 'success' : 'error'}
                            sx={{ color: 'white', fontWeight: 'bold' }}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Typography fontWeight="bold">Room tag : </Typography>
                        <Typography>{Array.isArray(roomData?.tag) ? roomData.tag.join(',') : ''}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" spacing={1}>
                        <Typography fontWeight="bold">Description : </Typography>
                        <Typography>{roomData?.description}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ mb: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        Guest :{' '}
                      </Typography>
                      {roomData?.guest}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        Bed :{' '}
                      </Typography>
                      {roomData.bed}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        Bed Type :{' '}
                      </Typography>
                      {Array.isArray(roomData?.bedType) ? roomData.bedType.join(',') : ''}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        Bathroom :{' '}
                      </Typography>
                      {roomData?.bathroom}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        reservation price :{' '}
                      </Typography>
                      {roomData?.reservationPrice}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        price :{' '}
                      </Typography>
                      {roomData?.price}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontWeight="bold" component="span">
                        youtube :{' '}
                      </Typography>
                      {roomData?.youtube ? (
                        <Link href={roomData?.youtube} target="_blank">
                          Open Youtube
                        </Link>
                      ) : (
                        ''
                      )}
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', my: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                  รูปห้อง
                </Typography>
                <Box sx={{ m: 2 }}>
                  <SRLWrapper options={options}>
                    <Grid container spacing={2}>
                      {roomData?.images &&
                        roomData?.images.map((img) => {
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
    const response = await Api.get(`/room/${query?.id}`, { httpsAgent: agent });

    return {
      props: {
        room: response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
export default RoomHostDetail;
