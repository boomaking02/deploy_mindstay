import https from 'https';
import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  CardMedia,
  Paper,
  Typography,
  Grid,
  Divider,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  IconButton,
  Slide,
  DialogContent,
  Container,
  DialogTitle,
  AppBar,
  Toolbar,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { createStyles, makeStyles } from '@mui/styles';
import CryptoJS from 'crypto-js';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { useForm, Controller } from 'react-hook-form';
import ReactPlayer from 'react-player/youtube';
import Room from '@src/components/Room';
import { ResortProps } from '@src/models/resort.model';
import { RoomProps } from '@src/models/room.model';
import Api from '@src/services/api';
import room1Image from '@src/static/img/room1.png';
import room2Image from '@src/static/img/room2.png';
import room3Image from '@src/static/img/room3.png';
import room4Image from '@src/static/img/test2.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 40,
      height: '100%',
      cursor: 'pointer',
    },
    cardBorder: {
      border: '2px solid #c7c4c4',
      borderRadius: 40,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);
type FormValues = {
  additionalBed: number;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
type AlertMessage = {
  color: Severity;
  message: string;
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const RoomDetailPage: React.FC<RoomProps> = ({ ...props }: RoomProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const { control, getValues, setValue } = useForm<FormValues>();
  const [open, setOpen] = useState(false);
  const [openArea, setAreaOpen] = useState(false);
  const [additionalBedValue, setAdditionalBedValue] = React.useState('0');
  const [additionalPrice, setAdditionalPrice] = React.useState<number>(0);
  const [dateValue, setDateValue] = React.useState<DateRange<Date>>([null, null]);
  const [rooms, setRooms] = useState<Array<RoomProps>>([]);
  const [resortSelected, setResortSelected] = useState<ResortProps | undefined>(undefined);
  const [openImage, setOpenImage] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [html, setHTML] = React.useState('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [daysLength, setDaysLength] = useState<number>(0);
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: 'บันทึกข้อมูลสำเร็จ',
  });
  const handleOpenDialog = async () => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/room?isActive=1&resort=${props.resort?.id}`, { httpsAgent: agent });
    setRooms(response.data);
    setResortSelected(props.resort);
    setOpen(true);
  };
  const handleAdditionalBedChange = (event: SelectChangeEvent) => {
    setValue('additionalBed', parseInt(event.target.value, 10) || 0);
    setAdditionalPrice(parseInt(event.target.value, 10) * props.additionalPrice);
    setAdditionalBedValue(event.target.value as string);
  };
  const handleClickOpen = () => {
    setAreaOpen(true);
  };
  const handleClose = () => {
    setAreaOpen(false);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };
  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setAlertOpen(false);
  };

  const onSelectedDate = async (value: DateRange<Date>) => {
    setDateValue(value);
    if (value[0] !== null && value[1] !== null) {
      const response = await Api.get(
        `/room/checkPrice?id=${props.id}&checkIn=${format(value[0], 'yyyy-MM-dd')}&checkOut=${format(
          new Date(value[1]),
          'yyyy-MM-dd'
        )}`
      );
      const diffInTime = value[1]?.getTime() - value[0]?.getTime();
      setDaysLength(diffInTime / (1000 * 3600 * 24) + 1);
      setTotalPrice(response.data?.totalPrice);
    }
  };

  const facility = props.resortProperties?.filter((f) => f.type === 'facility');
  const facilityList = facility?.slice(0, 8);
  const facilityDialog = facility?.slice(8, facility?.length);
  const area = props.resortProperties?.filter((a) => a.type === 'area of use');
  const policy = props.resortProperties?.filter((p) => p.type === 'policy');
  const handleCheckout = () => {
    if (dateValue[0] !== null && dateValue[1] !== null) {
      const encryptObj = CryptoJS.AES.encrypt(
        JSON.stringify({
          dateFrom: format(new Date(dateValue[0]), 'yyyy-MM-dd'),
          dateTo: format(new Date(dateValue[1]), 'yyyy-MM-dd'),
          additionalBed: getValues('additionalBed') || 0,
          room: props?.id,
        }),
        String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)
      ).toString();
      const encryptData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptObj));

      router.push(`/checkout?bookingData=${encryptData}`);
    } else {
      setAlertOpen(true);
      setAlert({
        color: 'error',
        message: 'กรุณาเลือกข้อมูลการจองให้ครบถ้วนก่อนจอง',
      });
    }
  };
  useEffect(() => {
    if (props.content !== '' && props.content) {
      const deltatest = JSON.parse(props.content).ops;
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(deltatest, cfg);
      const stringhtml = converter.convert();
      setHTML(stringhtml);
    }
  }, [props.content]);
  return (
    <>
      <Paper className={classStyle.paper}>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity={alert.color}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Container maxWidth="xl">
          <Box sx={{ px: { md: 30, xs: 0 } }}>
            <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
                  {props.resort?.name}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Prompt' }}>
                  {props.tag?.join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleOpenDialog}
                    sx={{ fontFamily: 'Prompt', mr: 1, borderRadius: '10px' }}
                  >
                    เปลี่ยนประเภทห้อง
                  </Button>
                  <Typography variant="h5" align="right" sx={{ fontFamily: 'Prompt' }}>
                    ห้องประเภท {props.name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="stretch" spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  src={room1Image.src}
                  className={classStyle.imgRound}
                  onClick={handleOpenImage}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CardMedia
                      component="img"
                      src={room2Image.src}
                      className={classStyle.imgRound}
                      onClick={handleOpenImage}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '-3rem', mr: 1 }}>
                      <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<MoreHorizIcon />}
                        sx={{ backgroundColor: 'white', borderRadius: '20px', fontFamily: 'Prompt' }}
                        onClick={handleOpenImage}
                      >
                        รูปภาพเพิ่มเติม
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      src={room3Image.src}
                      className={classStyle.imgRound}
                      onClick={handleOpenImage}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      src={room4Image.src}
                      className={classStyle.imgRound}
                      onClick={handleOpenImage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box my={5}>
              <Divider />
            </Box>
            <Grid container alignItems="stretch" spacing={2}>
              <Grid item xs={12} md={6}>
                <ReactPlayer url={props.youtube} width="100%" height="400px" />
                <Box mt={2} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ px: { xs: 0, md: 5 } }} display="flex" justifyContent="center" alignContent="center">
                  <Card elevation={0} className={classStyle.cardBorder}>
                    <CardContent>
                      <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={12}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                              disablePast
                              startText={<Typography fontWeight="bold">เช็คอิน</Typography>}
                              endText={<Typography fontWeight="bold">เช็คเอาท์</Typography>}
                              value={dateValue}
                              toolbarTitle="เลือกวันที่ต้องการจอง"
                              onChange={(newValue) => {
                                onSelectedDate(newValue);
                              }}
                              inputFormat="dd/MM/yyyy"
                              renderInput={(startProps, endProps) => (
                                <Grid container>
                                  <Grid item xs={6}>
                                    <TextField
                                      {...startProps}
                                      InputLabelProps={{ shrink: true }}
                                      placeholder="เพิ่มวันที่"
                                      sx={{ boxShadow: 1, borderRadius: 0 }}
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <TextField
                                      {...endProps}
                                      InputLabelProps={{ shrink: true }}
                                      placeholder="เพิ่มวันที่"
                                      sx={{ boxShadow: 1, borderRadius: 0 }}
                                    />
                                  </Grid>
                                </Grid>
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
                          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <PersonOutlineIcon />
                            <Typography variant="body1" fontWeight="bold">
                              {props.guest} ผู้เข้าพัก +{' '}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={7} sx={{ mt: 1 }}>
                          <Controller
                            name="additionalBed"
                            control={control}
                            render={({ field }) => {
                              return (
                                <FormControl variant="outlined" fullWidth>
                                  <InputLabel id="bed" sx={{ fontWeight: 'bold' }}>
                                    เพิ่มเตียงเสริม
                                  </InputLabel>
                                  <Select
                                    {...field}
                                    value={additionalBedValue}
                                    onChange={handleAdditionalBedChange}
                                    labelId="bed"
                                    label="เพิ่มเตียงเสริม"
                                    sx={{ boxShadow: 1, borderRadius: 0 }}
                                  >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ borderRadius: 15, fontSize: '1.5rem' }}
                            onClick={handleCheckout}
                          >
                            ชำระเงิน
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography component="del" variant="body1" sx={{ color: 'gray', ml: 3 }}>
                            THB {props.price?.toLocaleString()}
                          </Typography>
                          <Typography variant="h5" sx={{ textShadow: '1px 1px 3px gray' }}>
                            THB{' '}
                            {totalPrice
                              ? (totalPrice / daysLength).toLocaleString()
                              : props.reservationPrice?.toLocaleString()}{' '}
                            / คืน{' '}
                          </Typography>
                          {totalPrice ? (
                            <>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                  THB {(totalPrice / daysLength).toLocaleString()} x {daysLength} คืน
                                </Box>
                                <Box>{totalPrice.toLocaleString()}</Box>
                              </Box>
                              {additionalPrice ? (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Box>เตียงเสริม x {additionalBedValue} เตียง</Box>
                                  <Box>{additionalPrice.toLocaleString()}</Box>
                                </Box>
                              ) : null}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>ค่าบริการ</Box>
                                <Box>{(((totalPrice + additionalPrice) * 10) / 100).toLocaleString()}</Box>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>ยอดรวม</Box>
                                <Box>
                                  {(
                                    totalPrice +
                                    additionalPrice +
                                    ((totalPrice + additionalPrice) * 10) / 100
                                  ).toLocaleString()}
                                </Box>
                              </Box>
                            </>
                          ) : null}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Hideout koh Kood</Typography>
                <Typography variant="body2">
                  ผู้เข้าพัก {props.guest} คน / {props.bedroom} ห้องนอน / {props.bedType?.length} เตียง /{' '}
                  {props.bathroom} ห้องน้ำฝักบัว / ขนาด 750 ตารางฟุต
                </Typography>
              </Grid>
            </Grid>
            <Box my={5}>
              <Divider />
            </Box>
            <Box sx={{ fontFamily: 'Bai Jamjuree' }}>{parse(html)}</Box>
            <Box my={5}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      borderRight: { xs: '0px', sm: '1px solid #c7c4c4' },
                      borderBottom: { sm: '0px', xs: '1px solid #c7c4c4' },
                      mb: 5,
                    }}
                  >
                    {/* left */}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Typography component="ins" variant="h5" sx={{ fontFamily: 'Prompt' }}>
                            สิ่งอำนวยความสะดวก
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box px={3}>
                          <Grid container spacing={2} alignItems="center">
                            {facilityList?.map((property) => {
                              return (
                                <Grid item xs={6} sx={{ mb: 4 }} key={property.id} display="flex">
                                  <CardMedia component="img" image={property.image} sx={{ maxWidth: 30, mr: 1 }} />
                                  <Typography variant="body1">{property.name}</Typography>
                                </Grid>
                              );
                            })}
                            {facility?.length > 8 && (
                              <Grid item xs={12}>
                                <Box display="flex" mb={2} justifyContent="center" alignItems="center">
                                  <Button variant="outlined" color="inherit" size="large" onClick={handleClickOpen}>
                                    <MoreHorizIcon /> สิ่งอำนวยความสะดวกเพิ่มเติม
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* right */}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Typography component="ins" variant="h5" sx={{ fontFamily: 'Prompt' }}>
                            พื้นที่ใช้งาน
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box px={3}>
                          <Grid container spacing={2} alignItems="center">
                            {area?.map((property) => {
                              return (
                                <Grid item xs={6} sx={{ mb: 4 }} key={property.id} display="flex">
                                  <CardMedia component="img" image={property.image} sx={{ maxWidth: 30, mr: 1 }} />
                                  <Typography variant="body1">{property.name}</Typography>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box my={5}>
              <Divider />
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography component="ins" variant="h5" sx={{ fontFamily: 'Prompt' }}>
                      ข้อควรทราบ
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Container maxWidth="sm">
                    <Box px={3}>
                      <Grid container spacing={2} alignItems="center">
                        {policy?.map((property) => {
                          return (
                            <Grid item xs={6} sx={{ mb: 4 }} key={property.id} display="flex">
                              <CardMedia component="img" image={property.image} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">{property.name}</Typography>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Container>
                </Grid>
              </Grid>
            </Box>
            <Dialog open={openArea} onClose={handleClose}>
              <DialogContent>
                <Box>
                  <Grid container spacing={5} alignItems="center">
                    {facilityDialog?.map((property) => {
                      return (
                        <Grid item xs={6} sx={{ mb: 4 }} key={property.id} display="flex">
                          <CardMedia component="img" image={property.image} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">{property.name}</Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
            <Dialog fullScreen open={open} onClose={handleCloseDialog} TransitionComponent={Transition}>
              <AppBar className={classStyle.appBar} color="default">
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                    <Close />
                  </IconButton>
                  <Typography variant="h6" className={classStyle.title}>
                    {resortSelected?.name}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box>
                <Container fixed>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box mt={4}>
                        <Typography align="center" variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                          ทุกห้องพักด้านล่างมีรีวิวรีสอร์ทโดยรวมให้รับชม!!
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box fontSize="h4.fontSize" fontWeight="bold" mt={4} px={12}>
                        เลือกประเภทห้องพักของรีสอร์ท
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
          </Box>
        </Container>
      </Paper>
      <Dialog fullScreen open={openImage} onClose={handleCloseImage}>
        <DialogTitle id="responsive-dialog-title">
          <IconButton edge="start" color="inherit" onClick={handleCloseImage} aria-label="close">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CardMedia component="img" src={room1Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room2Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room3Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={12}>
                <CardMedia component="img" src={room4Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room2Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room3Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room2Image.src} className={classStyle.imgRound} />
              </Grid>
              <Grid item xs={6}>
                <CardMedia component="img" src={room3Image.src} className={classStyle.imgRound} />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/room/${query?.id}`, {
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

export default RoomDetailPage;
