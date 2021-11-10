/* eslint-disable import/no-duplicates */
import React, { useEffect } from 'react';
import { Box, Button, CardMedia, Grid, Paper, Typography, CardContent, Card, Container } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import CryptoJS from 'crypto-js';
import format from 'date-fns/format';
import th from 'date-fns/locale/th';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '@src/components/loader';
import { BookingProps } from '@src/models/booking.model';
import cancelImage from '@src/static/img/cancel.png';
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
export default function RedirectCheckout() {
  const router = useRouter();
  const classStyle = useStyles();
  const [transactionData, setTransactionData] = React.useState<BookingProps | null>(null);
  useEffect(() => {
    const { redirectData } = router.query;

    if (redirectData) {
      const decodeData = CryptoJS.enc.Base64.parse(String(redirectData)).toString(CryptoJS.enc.Utf8);
      const bytes = CryptoJS.AES.decrypt(decodeData, String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)).toString(
        CryptoJS.enc.Utf8
      );
      setTransactionData(JSON.parse(bytes));
    }
  }, [router.query]);
  if (transactionData === null) {
    return <Loader />;
  }
  return (
    <>
      <Paper className={classStyle.paper}>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center">
            <CardMedia
              component="img"
              src={transactionData?.status === 'complete' ? checkedImage.src : cancelImage.src}
              style={{ maxWidth: 100 }}
            />
          </Box>
          <Typography variant="h4" align="center">
            {transactionData?.status === 'complete' ? 'ชำระเงินสำเร็จ' : 'ชำระเงินไม่สำเร็จ'}
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
                    {transactionData?.paymentMethod}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">เบอร์โทร</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {transactionData?.tel}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">อีเมล</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {transactionData?.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    ยอดชำระ
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" style={{ fontWeight: 'bold' }}>
                    {transactionData?.totalPrice?.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">วัน/เวลาที่ชำระเงิน</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {transactionData?.updateDate &&
                      format(new Date(transactionData?.updateDate), 'dd MMM yyyy | H:mm:ss', { locale: th })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">วันที่เช็คอิน-เช็คเอาท์</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {transactionData?.checkIn &&
                      format(new Date(transactionData?.checkIn), 'dd MMM yyyy', { locale: th })}{' '}
                    -{' '}
                    {transactionData?.checkOut &&
                      format(new Date(transactionData?.checkOut), 'dd MMM yyyy', { locale: th })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">หมายเลขการจอง</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {transactionData?.bookingCode}
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
            <Link href={`/bookingManagement/bookingDetail/${transactionData.id}`}>
              <Button size="large" variant="contained" style={{ background: 'black', color: 'white' }}>
                ดูรายการสั่งซื้อ
              </Button>
            </Link>
          </Box>
        </Container>
      </Paper>
    </>
  );
}
