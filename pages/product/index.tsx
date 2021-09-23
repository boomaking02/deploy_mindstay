import React, { useState } from 'react';
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
  Select,
  MenuItem,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  DialogContent,
  Container,
  DialogTitle,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { createStyles, makeStyles } from '@mui/styles';
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube';
import checkinicon from '@src/static/img/checkinicon.png';
import contentImage from '@src/static/img/content.png';
import resicon from '@src/static/img/resicon.png';
import room1Image from '@src/static/img/room1.png';
import room2Image from '@src/static/img/room2.png';
import room3Image from '@src/static/img/room3.png';
import swimicon from '@src/static/img/swimicon.png';
import room4Image from '@src/static/img/test2.png';
import Room from '@src/components/Room';

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
interface IResort {
  id: number;
  name: string;
  bedroom: number;
  bathroom: number;
  price: number;
}
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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProductPage: React.FC = () => {
  const classStyle = useStyles();
  const [open, setOpen] = useState(false);
  const [openArea, setAreaOpen] = useState(false);
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [resortSelected, setResortSelected] = useState<IResort | undefined>(undefined);
  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenDialog = () => {
    const resort = resorts.find((item) => item.id === 1);
    setResortSelected(resort);
    setOpen(true);
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

  return (
    <>
      <Paper className={classStyle.paper}>
        <Container fixed>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="h5">Hideout koh Kood</Typography>
              <Typography variant="body1">เกาะกูด, ประเทศไทย</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" align="right">
                ห้องประเภท Twin Villa
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="inherit" size="small" onClick={handleOpenDialog}>
                  เปลี่ยนประเภทห้อง
                </Button>
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
              <ReactPlayer url="https://youtu.be/bdtF7jXIodQ" width="100%" height="400px" />
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
                            startText="เช็คอิน"
                            endText="เช็คเอาท์"
                            value={value}
                            toolbarTitle="เลือกวันที่ต้องการจจอง"
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <TextField {...startProps} />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField {...endProps} />
                                </Grid>
                              </Grid>
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                          <PersonOutlineIcon />
                          <Typography variant="body1">2 ผู้เข้าพัก</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="bed">เพิ่มเตียงเสริม</InputLabel>
                          <Select labelId="bed" label="เพิ่มเตียงเสริม">
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="/checkout">
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ borderRadius: 15 }}
                          >
                            ชำระเงิน
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="del" variant="body1" style={{ color: 'gray' }}>
                          ฿ 3,500.00
                        </Typography>
                        <Typography variant="h5">
                          ฿ 2,500.00 / คืน{' '}
                          <Typography component="span" variant="body1">
                            รวมภาษีแล้ว
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Hideout koh Kood</Typography>
              <Typography variant="body2">
                ผู้เข้าพัก 2-3 คน / 1 ห้องนอน / 1 เตียง / 1 ห้องน้ำฝักบัว / ขนาด 750 ตารางฟุต
              </Typography>
            </Grid>
          </Grid>
          <Box my={5}>
            <Divider />
          </Box>
          <CardMedia component="img" src={contentImage.src} />
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
                        <Typography component="ins" variant="h5">
                          สิ่งอำนวยความสะดวก
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box px={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" mb={2} justifyContent="center" alignItems="center">
                              <Button variant="outlined" color="inherit" size="large" onClick={handleClickOpen}>
                                <MoreHorizIcon /> สิ่งอำนวยความสะดวกเพิ่มเติม
                              </Button>
                            </Box>
                          </Grid>
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
                        <Typography component="ins" variant="h5">
                          พื้นที่ใช้งาน
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box px={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                              <CardMedia component="img" image={swimicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                              <Typography variant="body1">สระว่ายน้ำ</Typography>
                            </Box>
                          </Grid>
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
                  <Typography component="ins" variant="h5">
                    ข้อควรทราบ
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Container maxWidth="sm">
                  <Box px={3}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                          <CardMedia component="img" image={checkinicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                          <Typography variant="body1">เช็คอิน : 13:00</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Box>
          <Dialog open={openArea} onClose={handleClose}>
            <DialogContent>
              <Box>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <CardMedia component="img" image={resicon.src} sx={{ maxWidth: 30, mr: 1 }} />
                      <Typography variant="body1">อาหารเช้า ชากาแฟ </Typography>
                    </Box>
                  </Grid>
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
              <Box fontSize="h4.fontSize" fontWeight="bold" mt={4} px={12}>
                เลือกประเภทห้องพักของรีสอร์ท
              </Box>
              <Box>
                {rooms.map((room) => {
                  return <Room room={room} key={room.id} />;
                })}
              </Box>
            </Box>
          </Dialog>
        </Container>
      </Paper>
      <Dialog fullScreen open={openImage} onClose={handleCloseImage}>
        <DialogTitle id="responsive-dialog-title">
          <IconButton edge="start" color="inherit" onClick={handleCloseImage} aria-label="close">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container fixed>
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
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductPage;
