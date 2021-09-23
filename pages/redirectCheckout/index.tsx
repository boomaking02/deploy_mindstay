import React from 'react';
import { Box, Button, CardMedia, Grid, Paper, Typography, CardContent, Card, Container } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Link from 'next/link';
import checkedImage from '@src/static/img/checked.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
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
const RedirectCheckout: React.FC = () => {
  const classStyle = useStyles();
  return (
    <>
      <Paper className={classStyle.paper}>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center">
            <CardMedia component="img" src={checkedImage.src} style={{ maxWidth: 100 }} />
          </Box>
          <Typography variant="h4" align="center">
            ชำระเงินสำเร็จ
          </Typography>
          <Box mt={3} />
          <Card elevation={0} className={classStyle.cardBorder}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">ประเภทการชำระเงิน</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    QR Code
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">เบอร์โทร</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    0912345678
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">อีเมล</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    xxx@gmail.com
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    ยอดชำระ
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" style={{ fontWeight: 'bold' }}>
                    7,500.00
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">วัน/เวลาที่ชำระเงิน</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    6 ก.ค. 2564 | 11:46
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">วันที่เช็คอิน-เช็คเอาท์</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    24 ส.ค. - 27 ส.ค. 2564
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">หมายเลขการจอง</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    1234567890
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    <Typography component="span" style={{ fontWeight: 'bold' }}>
                      หมายเหตุ
                    </Typography>{' '}
                    : โปรดตรวจสอบใบกำกับภาษีที่อีเมลของท่าน
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box display="flex" my={5} justifyContent="center">
            <Link href="/">
              <Button size="large" variant="contained" style={{ background: 'black', color: 'white' }}>
                ดูรายการสั่งซื้อ
              </Button>
            </Link>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default RedirectCheckout;
