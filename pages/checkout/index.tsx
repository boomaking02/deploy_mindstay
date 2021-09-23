import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CropFreeIcon from '@mui/icons-material/CropFree';
import KingBedIcon from '@mui/icons-material/KingBed';
import SingleBedIcon from '@mui/icons-material/SingleBed';
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
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Link from 'next/link';
import room1Image from '@src/static/img/room1.png';

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
    },
    cardBorder: {
      border: '2px solid #c7c4c4',
      borderRadius: 20,
    },
  })
);
const CheckoutPage: React.FC = () => {
  const classStyle = useStyles();
  return (
    <>
      <Paper className={classStyle.paper}>
        <Container fixed>
          <Typography variant="h5">ยืนยันคำสั่งซื้อ</Typography>
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {/* show mobile */}
            <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Box display="flex" justifyContent="center" alignContent="center">
                <Card elevation={0} className={classStyle.cardBorder}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CardMedia component="img" src={room1Image.src} className={classStyle.imgRound} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6">Hideout koh Kood</Typography>
                        <Typography variant="body2">1 เตียง 1 ห้องน้ำ</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">รายละเอียดราคา</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">วันที่</Typography>
                        <Typography variant="body2">24 ส.ค. - 27 ส.ค.</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          แก้ไข
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">จำนวนผู้เข้าพัก</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          2 ท่าน
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">เตียงเสริม</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ไม่มี
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">฿ 2,500 ( x 3 คืน )</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 7,500
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">ส่วนลดทั่วไป</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 0
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">ภาษีมูลค่าเพิ่ม 7%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 490
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">รวม</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 7,490
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box width="100%" border="3px solid #867F7F" p={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h6">กรุณากรอกข้อมูลของท่าน</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} />
                    <Typography variant="body1">ชื่อ - นามสกุล</Typography>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} />
                    <Typography variant="body1">อีเมล</Typography>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} />
                    <Typography variant="body1">หมายเลขโทรศัพท์</Typography>
                    <TextField fullWidth variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} />
                    <Typography variant="body1">ส่งข้อความถึงที่พัก</Typography>
                    <TextField fullWidth variant="outlined" multiline rows={4} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} p={3} style={{ backgroundColor: '#FFF5F5' }}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        ประเภทเตียง
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Stack direction="row" spacing={2}>
                          <Box display="flex" alignItems="center">
                            <SingleBedIcon />
                            <Typography>เตียงคิง</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <KingBedIcon />
                            <Typography>เตียงควีน</Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5} />
                    <Typography variant="h6">ชำระด้วย</Typography>
                    <RadioGroup>
                      <FormControlLabel
                        value="credit"
                        control={<Radio />}
                        label={
                          <Box display="flex" alignItems="center">
                            <CreditCardIcon /> บัตรเครดิตหรือบัตรเดบิต
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="Qr"
                        control={<Radio />}
                        label={
                          <Box display="flex" alignItems="center">
                            <CropFreeIcon /> Qr Code
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="Internet"
                        control={<Radio />}
                        label={
                          <Box display="flex" alignItems="center">
                            <AccountBalanceIcon /> Internet Banking
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" noWrap>
                        รหัสส่วนลด
                      </Typography>
                      <Box mx={1} />
                      <TextField variant="outlined" />
                      <Box mx={1} />
                      <Button variant="contained" color="primary">
                        ใช้
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={5}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        นโยบายยกเลิกการจอง
                      </Typography>
                      <Typography variant="body1">ขอเงินคืนไม่ได้</Typography>
                      <Box mt={1} />
                      <Link href="/">
                        <Typography variant="body1" component="ins">
                          ดูข้อมูลเพิ่มเติม
                        </Typography>
                      </Link>
                      <Box mt={1} />
                      <Typography variant="body1">
                        นโยบายเกี่ยวกับเหตุสุดวิสัยของเราอาจไม่ครอบคลุมเหตุกระทบการเดินทางอันเกิดจากสถานการณ์ COVID 19
                        หรือเหตุการณ์ที่คาดการณ์ได้ เช่น สภาพอากาศเลวร้ายที่พบทั่วไป
                      </Typography>
                      <Box mt={1} />
                      <Typography variant="body2">
                        การยอมรับปุ่มด้านล่างเป็นการยอมรับความเสี่ยงการใช้งานเหรียญ STAY รวมถึงกฏของที่พัก,
                        การเปิดเผยความปลอดภัย, นโยบายยกเลิกการจอง, คำแนะนำของ Mindstay
                        ว่าด้วยการรักษาระยะห่างระหว่างบุคคลและ COVID 19, ข้อกำหนดด้วยความปลอดภัยในสถานการณ์ COVID 19
                        และนโยบายการคืนเงินให้ผู้เข้าพัก ตลอดจนยินยอมที่จะชำระเงินตามยอดที่ปรากฏซึ่งรวมค่าบริการแล้ว
                      </Typography>
                      <Box mt={1} />
                      <Link href="/redirectCheckout">
                        <Button color="primary" variant="contained" size="large">
                          จองทันที
                        </Button>
                      </Link>
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
                        <CardMedia component="img" src={room1Image.src} className={classStyle.imgRound} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6">Hideout koh Kood</Typography>
                        <Typography variant="body2">1 เตียง 1 ห้องน้ำ</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">รายละเอียดราคา</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">วันที่</Typography>
                        <Typography variant="body2">24 ส.ค. - 27 ส.ค.</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          แก้ไข
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">จำนวนผู้เข้าพัก</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          2 ท่าน
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">เตียงเสริม</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ไม่มี
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">฿ 2,500 ( x 3 คืน )</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 7,500
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">ส่วนลดทั่วไป</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 0
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">ภาษีมูลค่าเพิ่ม 7%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 490
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">รวม</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">
                          ฿ 7,490
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default CheckoutPage;
