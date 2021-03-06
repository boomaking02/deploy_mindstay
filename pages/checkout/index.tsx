/* eslint-disable import/no-duplicates */
import https from 'https';
import React, { useEffect, useState, useCallback } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KingBedIcon from '@mui/icons-material/KingBed';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import QrCodeIcon from '@mui/icons-material/QrCode';
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  Card,
  Divider,
  Container,
  Stack,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import CryptoJS from 'crypto-js';
import format from 'date-fns/format';
import th from 'date-fns/locale/th';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Loader from '@src/components/loader';
import { RoomProps } from '@src/models/room.model';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';
import firebaseConfig from '@src/utils/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(15),
      paddingBottom: theme.spacing(10),
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 10,
      height: '100%',
      maxHeight: '200px',
    },
    cardBorder: { border: '2px solid #c7c4c4', borderRadius: 20 },
  })
);
type FormValues = {
  name: string;
  email: string;
  tel: string;
  lineid: string;
  payment: string;
  voucher: string;
};
type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
type AlertMessage = {
  color: Severity;
  message: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CheckoutPage: React.FC = () => {
  const classStyle = useStyles();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const [bookingDataValue, setBookingValue] = useState<{
    additionalBed: number;
    dateFrom: string;
    dateTo: string;
    room: number;
  }>({
    additionalBed: 0,
    dateFrom: '',
    dateTo: '',
    room: 0,
  });
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [room, setRoom] = useState<RoomProps | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [daysLength, setDaysLength] = useState<number>(0);
  const [voucher, setVoucher] = useState(false);
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: '??????????????????????????????????????????????????????',
  });
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setOpen(false);
  };
  const getRoom = useCallback(async (roomId: number) => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/room/${roomId}`, {
      httpsAgent: agent,
    });
    setRoom(response.data);
  }, []);

  const getVat = (): number => {
    const additonalPrice = (room ? room.additionalPrice : 0) * bookingDataValue?.additionalBed;
    return ((totalPrice + additonalPrice) * 10) / 100;
  };

  const getSumPrice = (): number => {
    const additonalPrice = (room ? room.additionalPrice : 0) * bookingDataValue?.additionalBed;
    return totalPrice + additonalPrice + getVat();
  };
  const handleCheckVoucher = async () => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/voucher/code/${getValues('voucher')}`, {
      httpAgent: agent,
    });
    if (response.data) {
      setVoucher(true);
      setAlert({
        color: 'success',
        message: '????????????????????????????????????????????????????????????????????????????????????',
      });
      setOpen(true);
    } else {
      setVoucher(false);
      setAlert({
        color: 'error',
        message: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
      });
      setOpen(true);
    }
  };
  const calulatePrice = useCallback(async (dateFrom: string, dateTo: string, roomId: number) => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/room/checkPrice?id=${roomId}&checkIn=${dateFrom}&checkOut=${dateTo}`, {
      httpAgent: agent,
    });
    const diffInTime = new Date(dateTo).getTime() - new Date(dateFrom).getTime();
    setDaysLength(diffInTime / (1000 * 3600 * 24) + 1);
    setTotalPrice(response.data?.totalPrice);
  }, []);

  useEffect(() => {
    const { bookingData } = router.query;
    if (bookingData) {
      register('name', {
        validate: (value) => !!value || '?????????????????????????????????????????????.',
      });
      register('payment', {
        validate: (value) => !!value || '????????????????????????????????????????????????????????????????????????????????????.',
      });
      register('email', {
        validate: (value) => !!value || '?????????????????????????????????????????????',
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: '????????????????????????????????????????????????????????????????????????????????????????????????????????????',
        },
      });
      register('tel', {
        validate: (value) => !!value || '??????????????????????????????????????????????????????????????????',
        pattern: {
          value: /^\d*$/,
          message: '?????????????????????????????????????????????????????????????????????????????????',
        },
        minLength: { value: 9, message: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????' },
        maxLength: { value: 10, message: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????' },
      });
      const decodeData = CryptoJS.enc.Base64.parse(String(bookingData)).toString(CryptoJS.enc.Utf8);
      const bytes = CryptoJS.AES.decrypt(decodeData, String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)).toString(
        CryptoJS.enc.Utf8
      );

      const data = JSON.parse(bytes);

      if (data.dateFrom !== null && data.dateTo !== null) {
        getRoom(data.room);
        calulatePrice(data.dateFrom, data.dateTo, data.room);
        setCheckIn(new Date(data.dateFrom));
        setCheckOut(new Date(data.dateTo));
      }

      setBookingValue(JSON.parse(bytes));

      onAuthStateChanged(auth, async (user) => {
        const agent = new https.Agent({
          rejectUnauthorized: false,
        });
        if (user) {
          const response = await Api.get(`/user?uid=${user.uid}`, { httpsAgent: agent });
          setCurrentUser(response.data.items[0]);
          setValue('name', response.data.items[0].name);
          setValue('email', response.data.items[0].email);
          setValue('tel', response.data.items[0].tel);
        } else {
          router.push('/');
        }
      });
    }
  }, [router.query, getRoom, calulatePrice, router, register, setValue]);
  if (bookingDataValue === null) {
    return <Loader />;
  }
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!voucher) {
        setValue('voucher', '');
      }
      const servicePrice = getVat();
      const additonalPrice = bookingDataValue.additionalBed * (room ? room.additionalPrice : 0);
      const response = await Api.post('/payment', {
        name: data.name,
        reservationPrice: totalPrice,
        servicePrice,
        additonalPrice,
        email: data.email,
        tel: data.tel,
        lineId: data.lineid,
        checkIn: format(new Date(checkIn), 'yyyy-MM-dd'),
        checkOut: format(new Date(checkOut), 'yyyy-MM-dd'),
        roomId: bookingDataValue.room,
        userId: currentUser?.id,
        paymentMethod: data.payment,
        additionalBed: bookingDataValue?.additionalBed,
        voucher: data.voucher,
      });
      if (response.data) {
        const responseBooking = await Api({
          method: 'patch',
          url: `/booking/${response.data.OrderNo}`,
          data: {
            transId: String(response.data.TransactionId),
          },
        });

        const jsonData = await responseBooking.data;
        if (jsonData) {
          setAlert({
            color: 'info',
            message: '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
          });
          setOpen(true);
          router.replace(response.data.PaymentUrl);
        }
      }
    } catch (error) {
      setOpen(true);
      setAlert({
        color: 'error',
        message: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
      });
    }
  };
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
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Container fixed>
            <Typography variant="h5" fontWeight="bold">
              ???????????????????????????????????????????????????
            </Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              {/* show mobile */}
              <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Box display="flex" justifyContent="center" alignContent="center">
                  <Card elevation={0} className={classStyle.cardBorder}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CardMedia component="img" src={room?.images[0]} className={classStyle.imgRound} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" fontWeight="bold">
                            {room?.name}{' '}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" fontWeight="bold">
                            ?????????????????????????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ??????????????????
                          </Typography>
                          <Typography variant="body2" color="#867F7F">
                            {checkIn && format(new Date(checkIn), 'dd MMM yyyy', { locale: th })} -{' '}
                            {checkOut && format(new Date(checkOut), 'dd MMM yyyy', { locale: th })}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="text" color="primary">
                            ???????????????
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            THB {(totalPrice / daysLength).toLocaleString()} ( x {daysLength} ????????? )
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {totalPrice.toLocaleString()}
                          </Typography>
                        </Grid>
                        {bookingDataValue.additionalBed ? (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body1" fontWeight="bold">
                                ?????????????????????????????? ( x {bookingDataValue.additionalBed} ??????????????? )
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1" align="right">
                                THB{' '}
                                {(bookingDataValue.additionalBed * (room ? room.additionalPrice : 0)).toLocaleString()}
                              </Typography>
                            </Grid>
                          </>
                        ) : null}
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ???????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {getVat().toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ????????????????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB 0
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ??????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {getSumPrice().toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box width="100%" p={3}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h6">????????????????????????????????????</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} />
                      <Typography variant="body1">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                        ???????????? - ?????????????????????
                      </Typography>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              fullWidth
                              variant="outlined"
                              error={Boolean(errors?.name)}
                              helperText={errors?.name?.message}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} />
                      <Typography variant="body1">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                        ???????????????
                      </Typography>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              fullWidth
                              variant="outlined"
                              error={Boolean(errors?.email)}
                              helperText={errors?.email?.message}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} />
                      <Typography variant="body1">
                        <Typography color="error" component="span">
                          *
                        </Typography>
                        ?????????????????????????????????????????????
                      </Typography>
                      <Controller
                        name="tel"
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              fullWidth
                              variant="outlined"
                              error={Boolean(errors?.tel)}
                              helperText={errors?.tel?.message}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} />
                      <Typography variant="body1">Line ID</Typography>
                      <Controller
                        name="lineid"
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              fullWidth
                              variant="outlined"
                              error={Boolean(errors?.lineid)}
                              helperText={errors?.lineid?.message}
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} p={3} style={{ backgroundColor: '#FFF5F5' }}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          ?????????????????????????????????
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Stack direction="row" spacing={2}>
                            <Box display="flex" alignItems="center">
                              <KingBedIcon />
                              <Typography>1 ????????????????????????????????????</Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5} />
                      <Typography variant="h6">????????????????????????</Typography>
                      <Controller
                        name="payment"
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <RadioGroup {...field}>
                              <FormControlLabel
                                value="creditcard"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <CreditCardIcon /> ??????????????????????????????
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="bank_qrcode"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <QrCodeIcon /> Qr Code
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="internetbank_bbl"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <AccountBalanceIcon /> Internet Banking ?????????????????????
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="internetbank_bay"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <AccountBalanceIcon /> Internet Banking ?????????????????????
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="internetbank_scb"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <AccountBalanceIcon /> Internet Banking SCB
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="internetbank_ktb"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <AccountBalanceIcon /> Internet Banking ?????????????????????
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="internetbank_ttb"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <AccountBalanceIcon /> Internet Banking ??????????????????
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="payplus_kbank"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <PhoneAndroidIcon /> K-PLUS
                                  </Box>
                                }
                              />
                              <FormControlLabel
                                value="mobilebank_scb"
                                control={<Radio />}
                                label={
                                  <Box display="flex" alignItems="center">
                                    <PhoneAndroidIcon /> SCB Easy App
                                  </Box>
                                }
                              />
                            </RadioGroup>
                          );
                        }}
                      />
                      {Boolean(errors?.payment) && <Typography color="error">*{errors?.payment?.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" noWrap>
                          ??????????????????????????????
                        </Typography>
                        <Box mx={1} />
                        <Controller
                          name="voucher"
                          control={control}
                          defaultValue=""
                          render={({ field }) => {
                            return <TextField {...field} variant="outlined" />;
                          }}
                        />
                        <Box mx={1} />
                        <Button variant="contained" color="primary" onClick={handleCheckVoucher}>
                          ?????????
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={5}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          ?????????????????????????????????????????????????????????
                        </Typography>
                        <Box mt={2} />
                        <Typography variant="body1">
                          ??????????????????????????????????????????????????????{' '}
                          <Typography component="span" fontWeight="bold">
                            ????????????????????????
                          </Typography>{' '}
                          ???????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Box mt={2} />
                        <Typography variant="body2">
                          1.?????????????????????????????????????????????????????????????????? ?????????????????????????????? ??????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Typography variant="body2">
                          2.????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? COVID-19
                        </Typography>
                        <Box mt={2} />
                        <Typography variant="body2">
                          ???????????????????????????????????? ?????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? STAY , ?????????????????????????????????,
                          ???????????????????????????????????????????????????????????????, ??????????????????????????????????????????????????????, ?????????????????????????????? Mindstay
                          ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? COVID 19, ?????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Box mt={2} />
                        <Typography variant="body2">
                          ????????????????????????????????? COVID 19 ????????????????????????????????????????????????????????????????????????????????????????????????
                          ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Box mt={4} />
                        <Button color="primary" variant="contained" size="large" type="submit">
                          <Typography fontSize="1.5rem" sx={{ fontFamily: 'Prompt' }}>
                            ????????????????????????
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* show desktop */}
              <Grid item xs={4}>
                <Box
                  sx={{ display: { xs: 'none', md: 'flex' }, position: 'sticky', top: 100 }}
                  justifyContent="center"
                  alignContent="center"
                >
                  <Card elevation={0} className={classStyle.cardBorder}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CardMedia component="img" src={room?.images[0]} className={classStyle.imgRound} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" fontWeight="bold">
                            {room?.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" fontWeight="bold">
                            ?????????????????????????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ??????????????????
                          </Typography>
                          <Typography variant="body2" color="#867F7F">
                            {bookingDataValue?.dateFrom &&
                              format(new Date(bookingDataValue?.dateFrom), 'dd MMM yyyy', { locale: th })}{' '}
                            -{' '}
                            {bookingDataValue?.dateTo &&
                              format(new Date(bookingDataValue?.dateTo), 'dd MMM yyyy', { locale: th })}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            ???????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            THB {(totalPrice / daysLength).toLocaleString()} ( x {daysLength} ????????? )
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {totalPrice.toLocaleString()}
                          </Typography>
                        </Grid>
                        {bookingDataValue.additionalBed ? (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="body1" fontWeight="bold">
                                ?????????????????????????????? ( x {bookingDataValue.additionalBed} ??????????????? )
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1" align="right">
                                THB{' '}
                                {(bookingDataValue.additionalBed * (room ? room.additionalPrice : 0)).toLocaleString()}
                              </Typography>
                            </Grid>
                          </>
                        ) : null}
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ???????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {getVat().toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ????????????????????????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB 0
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            ??????????????????
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" align="right">
                            THB {getSumPrice().toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Paper>
    </>
  );
};

export default CheckoutPage;
