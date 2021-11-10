import https from 'https';
import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Paper,
  Container,
  Card,
  CardContent,
  Snackbar,
  Typography,
  Box,
  ButtonGroup,
  Button,
  Stack,
  Chip,
  Grid,
  Breadcrumbs,
  Link,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
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
type AlertMessage = {
  color: Severity;
  message: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const BookingDetail: React.FC<BookingProps> = ({ ...props }: BookingProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [statusColor, setStatusColor] = useState<Severity | 'secondary'>('success');
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: 'บันทึกข้อมูลสำเร็จ',
  });
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [intervalDate] = useState(
    intervalToDuration({
      start: new Date(props?.checkIn),
      end: new Date(props?.checkOut),
    })
  );
  // check in
  const [openCheckIn, setCheckInOpen] = React.useState(false);
  const handleCheckInOpen = () => {
    setCheckInOpen(true);
  };

  const handleCheckInClose = () => {
    setCheckInOpen(false);
  };
  const handleConfirmCheckIn = async () => {
    try {
      const res = await Api({
        method: 'patch',
        url: `/booking/${props.bookingCode}`,
        data: {
          status: 'check-in',
        },
      });
      const jsonData = await res.data;
      if (jsonData) {
        setAlert({
          color: 'success',
          message: 'บันทึกข้อมูลสำเร็จ',
        });
        setOpen(true);
        setCheckInOpen(false);
        router.reload();
      }
    } catch (error) {
      setOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };
  // check out
  const [openCheckOut, setCheckOutOpen] = React.useState(false);
  const handleCheckOutOpen = () => {
    setCheckOutOpen(true);
  };

  const handleCheckOutClose = () => {
    setCheckOutOpen(false);
  };
  const handleConfirmCheckOut = async () => {
    try {
      const res = await Api({
        method: 'patch',
        url: `/booking/${props.bookingCode}`,
        data: {
          status: 'check-out',
        },
      });
      const jsonData = await res.data;
      if (jsonData) {
        setAlert({
          color: 'success',
          message: 'บันทึกข้อมูลสำเร็จ',
        });
        setOpen(true);
        setCheckInOpen(false);
        router.reload();
      }
    } catch (error) {
      setOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setOpen(false);
  };

  const breadcrumbs = [
    <Link
      href={`/hostManagement/${currentUser?.id}`}
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.color}>
            {alert.message}
          </Alert>
        </Snackbar>
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
          <Grid container spacing={1}>
            <Grid item md={6}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleCheckInOpen}
                  sx={{ display: props?.status === 'complete' ? 'flex' : 'none' }}
                >
                  Confirm Check-In
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  onClick={handleCheckOutOpen}
                  sx={{ display: props?.status === 'check-in' ? 'flex' : 'none' }}
                >
                  Confirm Check-Out
                </Button>
              </Box>
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
        {/* dialog check-in */}
        <Dialog open={openCheckIn} onClose={handleCheckInClose}>
          <DialogTitle>ต้องการยืนยันการเช็คอินการจองนี้หรือไม่</DialogTitle>
          <DialogContent>
            <DialogContentText>กดยืนยันเพื่อทำการเปลี่ยนสถานะของการจองนี้</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCheckInClose}>ยกเลิก</Button>
            <Button onClick={handleConfirmCheckIn} color="primary" autoFocus>
              ยืนยันเช็คอิน
            </Button>
          </DialogActions>
        </Dialog>
        {/* dialog check-out */}
        <Dialog open={openCheckOut} onClose={handleCheckOutClose}>
          <DialogTitle>ต้องการยืนยันการเช็คเอาท์การจองนี้หรือไม่</DialogTitle>
          <DialogContent>
            <DialogContentText>กดยืนยันเพื่อทำการเปลี่ยนสถานะของการจองนี้</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCheckOutClose}>ยกเลิก</Button>
            <Button onClick={handleConfirmCheckOut} color="primary" autoFocus>
              ยืนยันเช็คเอาท์
            </Button>
          </DialogActions>
        </Dialog>
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
