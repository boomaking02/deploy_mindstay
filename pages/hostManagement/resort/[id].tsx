import https from 'https';
import React, { useEffect, useState } from 'react';
import { Paper, Container, Card, CardContent, Typography, Box, Grid, Button, ButtonGroup } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ResortHost from '@src/components/HostComponent/resort';
import { ResortProps } from '@src/models/resort.model';
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
  resorts: { items: ResortProps[]; meta: { [key: string]: number } };
}
const ResortHostList: React.FC<HostProps> = ({ userData, resorts }: HostProps) => {
  const router = useRouter();
  const classStyle = useStyles();
  const [currentUser] = useState<UserProps>(userData);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid === userData?.uid) {
        if (userData.role !== 'host' && userData !== undefined) {
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
                  color="primary"
                  noWrap
                  variant="body1"
                  align="center"
                  sx={{ fontFamily: 'Prompt', fontWeight: 400, py: 2 }}
                >
                  Resort
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
          <Grid container>
            <Grid item md={6}>
              <Card sx={{ width: '100%', my: 2, mr: 2, height: '120px' }}>
                <CardContent>
                  <Typography color="primary" variant="h5" sx={{ fontFamily: 'Prompt' }}>
                    จำนวนรีสอร์ททั้งหมด
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
                    {resorts.meta.itemCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ width: '100%', my: 2 }}>
            <CardContent>
              <Box sx={{ my: 2 }}>
                <Button href={`addResort/${currentUser?.id}`} variant="contained" color="primary" size="large">
                  Add Resort
                </Button>
              </Box>
              <ResortHost resorts={resorts} />
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
    const response = await Api.get(`/user/${query?.id}`, { httpsAgent: agent });
    const responseResort = await Api.get(`/resort/host/${query?.id}`, { httpsAgent: agent });

    return {
      props: {
        userData: response.data,
        resorts: responseResort.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
export default ResortHostList;
