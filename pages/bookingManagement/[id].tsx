import https from 'https';
import React, { useEffect, useState } from 'react';
import { Paper, Container, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BookingHost from '@src/components/HostComponent/booking';
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
interface HostProps {
  userData: UserProps;
  bookingData: { items: BookingProps[]; meta: { [key: string]: number } };
}

const HostManegementPage: React.FC<HostProps> = ({ userData, bookingData }: HostProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const [currentUser] = useState<UserProps>(userData);
  const [bookingList] = useState<{ items: BookingProps[]; meta: { [key: string]: number } }>(bookingData);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid === userData?.uid) {
        if (userData === undefined) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    });
  }, [router, userData]);
  return (
    <>
      <Paper className={classStyle.paper}>
        <Container fixed>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
            ข้อมูลการจองของคุณ {currentUser?.name}
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Card sx={{ width: '100%', my: 2, height: '120px' }}>
                <CardContent>
                  <Typography color="primary" variant="h5" sx={{ fontFamily: 'Prompt' }}>
                    จำนวนการจองทั้งหมด
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
                    {bookingList?.meta?.totalItems}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ my: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <BookingHost bookings={bookingList} />
          </Box>
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
    const response = await Api.get(`/user/${query?.id}`, { httpsAgent: agent });
    const bookingRes = await Api.get(`/booking?user=${query?.id}`, { httpsAgent: agent });
    return {
      props: {
        userData: response.data,
        bookingData: bookingRes.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
export default HostManegementPage;
