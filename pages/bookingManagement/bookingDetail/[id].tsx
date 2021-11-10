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
  Chip,
  Grid,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { format, intervalToDuration } from 'date-fns';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { BookingProps } from '@src/models/booking.model';
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
type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
const BookingDetail: React.FC<BookingProps> = ({ ...props }: BookingProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const [statusColor, setStatusColor] = useState<Severity | 'secondary'>('success');

  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [intervalDate] = useState(
    intervalToDuration({
      start: new Date(props?.checkIn),
      end: new Date(props?.checkOut),
    })
  );
  const breadcrumbs = [
    <Link
      href={`/bookingManagement/${currentUser?.id}`}
      key="1"
      underline="hover"
      color="inherit"
      sx={{ cursor: 'pointer', fontFamily: 'Prompt' }}
    >
      Dashboard
    </Link>,
    <Typography key="2" color="primary" fontFamily="Prompt">
      Booking Detail
    </Typography>,
  ];
  useEffect(() => {
    if (props.status === 'success' || props.status === 'complete') {
      setStatusColor('success');
    } else if (props.status === 'check-in') {
      setStatusColor('secondary');
    } else if (props.status === 'check-out') {
      setStatusColor('info');
    } else if (props.status === 'pending') {
      setStatusColor('warning');
    } else {
      setStatusColor('error');
    }
    onAuthStateChanged(auth, async (user) => {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      if (user) {
        const response = await Api.get(`/user?uid=${user.uid}`, { httpsAgent: agent });
        setCurrentUser(response.data.items[0]);
        if (response.data.items[0].role !== 'host' && response.data.items[0] !== undefined) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    });
  }, [props.status, router]);
  return (
    <>
      <Paper className={classStyle.paper}>
        <Container fixed>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
            ข้อมูลการจองของคุณ {currentUser?.name}
          </Typography>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Card sx={{ width: '100%', my: 2 }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                      หมายเลขการจอง :
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {props.bookingCode}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight="bold">ชื่อผู้ใช้ : </Typography>
                    <Typography>{props?.user?.name}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', my: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                ข้อมูลผู้จอง
              </Typography>
              <Box sx={{ m: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">ชื่อ - นามสกุล : </Typography>
                      <Typography>{props?.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">อีเมล์ : </Typography>
                      <Typography>{props?.email}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">เบอร์โทรศัพท์ : </Typography>
                      <Typography>{props?.tel}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">Line ID : </Typography>
                      <Typography>{props?.lineId}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', my: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                ข้อมูลห้อง
              </Typography>
              <Box sx={{ m: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">วันที่จอง : </Typography>
                      <Typography>{format(new Date(props?.createDate), 'dd/MM/yyyy H:m:s')}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">ชำระด้วย : </Typography>
                      <Typography>{props?.paymentMethod}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">Check-in : </Typography>
                      <Typography>{format(new Date(props?.checkIn), 'dd/MM/yyyy')}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">Check-out : </Typography>
                      <Typography>{format(new Date(props?.checkOut), 'dd/MM/yyyy')}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">เพิ่มเตียงเสริม : </Typography>
                      <Typography>{props?.addionalBed || 0}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" spacing={1}>
                      <Box>
                        <Typography fontWeight="bold">สถานะ : </Typography>
                      </Box>
                      <Box>
                        <Chip label={props.status} color={statusColor} sx={{ color: 'white', fontWeight: 'bold' }} />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', my: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" fontFamily="Prompt">
                สรุปราคา
              </Typography>
              <Box sx={{ m: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">
                        {props?.reservationPrice && intervalDate.days
                          ? (props?.reservationPrice / intervalDate.days).toFixed(2)
                          : '-'}{' '}
                        x {intervalDate.days} คืน :
                      </Typography>
                      <Typography>{props?.reservationPrice || '-'}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">ค่าบริการ</Typography>
                      <Typography>{props?.servicePrice || '-'}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">ส่วนลดทั่วไป</Typography>
                      <Typography>{props?.discountPrice || '-'}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight="bold">ราคารวม</Typography>
                      <Typography>{props?.totalPrice || '-'}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Paper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await Api.get(`/booking/${query?.id}`, {
      httpsAgent: agent,
    });
    return {
      props: {
        ...response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
export default BookingDetail;
