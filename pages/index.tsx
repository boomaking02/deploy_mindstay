import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, CardMedia, Typography, Fab, Grid, Card, CardContent, Container, Stack } from '@mui/material';
import { OutlinedInputProps } from '@mui/material//OutlinedInput';
import TextField, { TextFieldProps } from '@mui/material//TextField';
import { alpha, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import ReactPlayer from 'react-player/youtube';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import header1 from '@public/static/img/header1.png';
import header2 from '@public/static/img/header2.png';
import InterestCarousel from '@src/components/interestCarousel';
import LifeStyle from '@src/components/lifeStyleCarousel';
import Partners from '@src/components/partners';
import RecommendCarousel from '@src/components/recommendCarousel';
import TeamManagement from '@src/components/teamManagement';

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '0.8rem',
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 50,
      color: '#F05D76',
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },

    focused: {},
  })
);
function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />;
}
const useStyles = makeStyles(() => ({
  imgCover: { height: '100%', objectFit: 'cover' },
}));
const cardFlex = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' };
const Home: React.FC = () => {
  const classStyle = useStyles();
  return (
    <>
      {/* search desktop */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          height: '90vh',
          maxHeight: '1300px',
          minHeight: '600px',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            padding: '0 16px,',
            maxWidth: '960px',
            mt: '140px',
            alignItems: 'center',
            ml: 'auto',
            mr: 'auto',
            mb: '92px',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 10,
            color: 'white',
          }}
        >
          <Typography variant="h3" align="center">
            ไปเที่ยวไหนดี?
          </Typography>
          <Box display="flex">
            <RedditTextField
              label={
                <Box color="#F05D76" display="flex">
                  <SearchIcon />
                  <Typography>ค้นหาสถานที่</Typography>
                </Box>
              }
              defaultValue=""
              variant="filled"
              sx={{ width: 600 }}
            />
            <Fab color="primary" sx={{ ml: '5px' }}>
              <SearchIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
      {/* search mobile */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            maxWidth: '960px',
            mt: '140px',
            mb: 10,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 10,
            color: 'white',
          }}
        >
          <Typography variant="h4" align="center">
            ไปเที่ยวไหนดี?
          </Typography>
          <Box display="flex">
            <RedditTextField
              label={
                <Box color="#F05D76" display="flex">
                  <SearchIcon />
                  <Typography>ค้นหาสถานที่</Typography>
                </Box>
              }
              defaultValue=""
              variant="filled"
              sx={{ width: '100%' }}
            />
            <Fab color="primary" sx={{ ml: '5px' }}>
              <SearchIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
      {/* hero desktop */}
      <Box sx={{ position: 'absolute', top: 0, display: { xs: 'none', sm: 'inherit' } }}>
        <Carousel autoPlay interval={5000} emulateTouch stopOnHover showThumbs={false} showStatus={false}>
          <Box height="90vh">
            <CardMedia component="img" image={header1.src} className={classStyle.imgCover} />
          </Box>
          <Box height="90vh">
            <CardMedia component="img" image={header2.src} className={classStyle.imgCover} />
          </Box>
        </Carousel>
      </Box>
      {/* hero mobile */}
      <Box sx={{ position: 'absolute', top: 0, display: { xs: 'inherit', sm: 'none' } }}>
        <CardMedia component="img" image={header2.src} className={classStyle.imgCover} sx={{ minHeight: '43vh' }} />
      </Box>
      <Container fixed>
        <Box my={8}>
          <Typography variant="h4">ไลฟสไตล์</Typography>
          <LifeStyle />
        </Box>
        <Box mb={3}>
          <Box mb={3}>
            <Typography variant="h4">แนะนำที่พักคูลๆ ห้องวิวสวยๆ</Typography>
          </Box>
          <RecommendCarousel />
        </Box>
        <Box mb={3}>
          <Box mb={3}>
            <Typography variant="h4">กิจกรรมที่น่าสนใจ</Typography>
          </Box>
          <InterestCarousel />
        </Box>
      </Container>
      <Box sx={{ backgroundColor: '#EFE9E9', py: 5 }}>
        <Container fixed>
          <Grid container alignItems="stretch">
            {/* social mobile */}
            <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
                <Box>
                  <Card sx={{ height: '120px', backgroundColor: '#e26c6b4d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <YouTubeIcon sx={{ fontSize: '4rem', color: '#e26c6b' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Youtube</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card sx={{ height: '120px', backgroundColor: '#5270a457', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FacebookOutlinedIcon sx={{ fontSize: '4rem', color: '#5270a4' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Facebook</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card sx={{ height: '120px', backgroundColor: '#c0598f3d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <InstagramIcon sx={{ fontSize: '4rem', color: '#c0598f' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Instagram</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </Grid>
            {/* youtube */}
            <Grid item xs={12} md={9}>
              <ReactPlayer url="https://youtu.be/bdtF7jXIodQ" width="100%" height="436px" />
            </Grid>
            {/* social desktop */}
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'inline' } }}>
              <Stack spacing={1}>
                <Box sx={{ px: 3 }}>
                  <Card sx={{ height: '140px', backgroundColor: '#e26c6b4d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <YouTubeIcon sx={{ fontSize: '4rem', color: '#e26c6b' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Youtube</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Card sx={{ height: '140px', backgroundColor: '#5270a457', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FacebookOutlinedIcon sx={{ fontSize: '4rem', color: '#5270a4' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Facebook</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Card sx={{ height: '140px', backgroundColor: '#c0598f3d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <InstagramIcon sx={{ fontSize: '4rem', color: '#c0598f' }} />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6">Instagram</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container fixed>
        <Box my={10}>
          <Typography variant="h4">Team Management</Typography>
          <TeamManagement />
        </Box>
        <Box mb={10}>
          <Typography variant="h4">Partners</Typography>
          <Partners />
        </Box>
      </Container>
    </>
  );
};

export default Home;
