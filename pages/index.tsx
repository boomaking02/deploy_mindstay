import https from 'https';
import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  CardMedia,
  Typography,
  Fab,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  InputAdornment,
  Link,
} from '@mui/material';
import { OutlinedInputProps } from '@mui/material//OutlinedInput';
import TextField, { TextFieldProps } from '@mui/material//TextField';
import { alpha, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { GetServerSideProps } from 'next';
import ReactPlayer from 'react-player/youtube';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InterestCarousel from '@src/components/interestCarousel';
import LifeStyle from '@src/components/lifeStyleCarousel';
import RecommendCarousel from '@src/components/recommendCarousel';
import TeamManagement from '@src/components/teamManagement';
import TripBusiness from '@src/components/tripBusiness';
import { BannerProps, PartnerProps } from '@src/models/home.model';
import { ResortCategoryProps, ResortZoneProps } from '@src/models/resort.model';
import Api from '@src/services/api';
import searchs from '@src/static/img/icon/search.webp';
import imageDetail from '@src/static/img/imageDetail.png';

type HomeProps = {
  resortZones: Array<ResortZoneProps>;
  resortCategories: Array<ResortCategoryProps>;
  banners: Array<BannerProps>;
  partners: Array<PartnerProps>;
};

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 10,
      color: '#F05D76 !important',
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
    input: {
      '&::placeholder': {
        marginLeft: 20,
      },
    },
    focused: {},
  })
);
function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      InputProps={
        {
          classes,
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <CardMedia component="img" image={searchs.src} sx={{ width: '26px' }} />
            </InputAdornment>
          ),
        } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
}
function RedditTextDate(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      InputProps={
        {
          classes,
          disableUnderline: true,
        } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  imgCover: { height: '100%', objectFit: 'cover' },
  interesting: {
    color: '#222222',
    textDecoration: 'none',
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRight: '1px solid #222222',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  cardImage: {
    objectFit: 'contain',
  },
}));
const cardFlex = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' };
const Home: React.FC<HomeProps> = ({ ...props }: HomeProps) => {
  const { banners, resortCategories, resortZones, partners } = props;
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
          <Box display="flex">
            <Grid container>
              <Grid item xs={6}>
                <RedditTextField
                  label={
                    <Box color="#F05D76" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '1.3rem', fontFamily: 'Prompt', ml: 5, pb: 2 }}>สถานที่</Typography>
                    </Box>
                  }
                  placeholder="ไปเที่ยวไหนดี ?"
                  defaultValue=""
                  variant="filled"
                  sx={{ width: '120%' }}
                />
              </Grid>
              <Grid item xs={3}>
                <RedditTextDate
                  label={
                    <Box color="#F05D76" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '1.3rem', fontFamily: 'Prompt', pb: 2 }}>เช็คอิน</Typography>
                    </Box>
                  }
                  placeholder="เพิ่มวันที่"
                  defaultValue=""
                  variant="filled"
                  sx={{ width: '120%' }}
                />
              </Grid>
              <Grid item xs={3}>
                <RedditTextDate
                  label={
                    <Box color="#F05D76" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '1.3rem', fontFamily: 'Prompt', pb: 2 }}>เช็คเอาท์</Typography>
                    </Box>
                  }
                  placeholder="เพิ่มวันที่"
                  defaultValue=""
                  variant="filled"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>

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
          mb: 8,
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
          <Box display="flex">
            <RedditTextField
              label={
                <Box color="#F05D76" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '1.3rem', fontFamily: 'Prompt', ml: 5, pb: 2 }}>สถานที่</Typography>
                </Box>
              }
              defaultValue=""
              variant="filled"
              sx={{ width: '100%' }}
            />
            <Fab color="primary" sx={{ ml: '5px', minWidth: '56px' }}>
              <SearchIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
      {/* hero desktop */}
      <Box sx={{ position: 'absolute', top: 0, display: { xs: 'none', sm: 'inherit' } }}>
        <Carousel autoPlay interval={5000} emulateTouch stopOnHover showThumbs={false} showStatus={false}>
          {banners?.map((banner) => {
            return (
              <Box height="90vh" key={banner.id}>
                <CardMedia component="img" image={banner.image} className={classStyle.imgCover} />
              </Box>
            );
          })}
        </Carousel>
      </Box>
      {/* hero mobile */}
      <Box sx={{ position: 'absolute', top: 0, display: { xs: 'inherit', sm: 'none' } }}>
        <Carousel autoPlay interval={5000} emulateTouch stopOnHover showThumbs={false} showStatus={false}>
          {banners?.map((banner) => {
            return (
              <CardMedia
                key={banner.id}
                component="img"
                image={banner.image}
                className={classStyle.imgCover}
                sx={{ minHeight: '43vh' }}
              />
            );
          })}
        </Carousel>
      </Box>
      <Container maxWidth="xl">
        <Box my={8}>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
            ไลฟ์สไตล์ที่พัก
          </Typography>
          <LifeStyle liftStyles={resortCategories} />
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box mb={8}>
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
              ห้องพักแนะนำ
            </Typography>
          </Box>
          <RecommendCarousel />
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ px: { md: 15 } }}>
        <Box mb={8}>
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
              ทริปธุรกิจ
            </Typography>
            <TripBusiness />
          </Box>
        </Box>
        <Box mb={8}>
          <Box>
            <CardMedia component="img" image={imageDetail.src} sx={{ width: '100%' }} />
          </Box>
        </Box>
        <Box mb={8}>
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
              กิจกรรมที่น่าสนใจ
            </Typography>
          </Box>
          <InterestCarousel />
        </Box>
      </Container>
      <Box sx={{ backgroundColor: '#EFE9E9', py: 5 }}>
        <Container fixed>
          <Grid container alignItems="stretch">
            <Grid item xs={12}>
              <Stack spacing={1} direction="row" sx={{ justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
                  ติดตามการเดินทางของพวกเราผ่านช่องทางด้านล่าง
                </Typography>
                <FavoriteBorderIcon />
              </Stack>
            </Grid>
            {/* social mobile */}
            <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, mb: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Link href="https://www.youtube.com/channel/UCNGar5dz5JYjtKS-hCqEHMQ" target="_blank">
                    <Card sx={{ height: '120px', backgroundColor: '#e26c6b4d', color: '#252e30', borderRadius: 5 }}>
                      <CardContent sx={cardFlex}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <YouTubeIcon sx={{ fontSize: '4rem', color: '#e26c6b' }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link href="https://www.facebook.com/mindswantv" target="_blank">
                    <Card
                      sx={{
                        height: '120px',
                        backgroundColor: '#5270a457',
                        color: '#252e30',
                        borderRadius: 5,
                        cursor: 'pointer',
                      }}
                    >
                      <CardContent sx={cardFlex}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <FacebookOutlinedIcon sx={{ fontSize: '4rem', color: '#5270a4' }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ height: '120px', backgroundColor: '#c0598f3d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <InstagramIcon sx={{ fontSize: '4rem', color: '#c0598f' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            {/* youtube */}
            <Grid item xs={12} md={9}>
              <ReactPlayer url="https://youtu.be/bdtF7jXIodQ" width="100%" height="436px" />
            </Grid>
            {/* social desktop */}
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'inline' } }}>
              <Stack spacing={1}>
                <Box sx={{ px: 3 }}>
                  <Link href="https://www.youtube.com/channel/UCNGar5dz5JYjtKS-hCqEHMQ" target="_blank">
                    <Card sx={{ height: '140px', backgroundColor: '#e26c6b4d', color: '#252e30', borderRadius: 5 }}>
                      <CardContent sx={cardFlex}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <YouTubeIcon sx={{ fontSize: '6rem', color: '#e26c6b' }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Link href="https://www.facebook.com/mindswantv" target="_blank">
                    <Card
                      sx={{
                        height: '140px',
                        backgroundColor: '#5270a457',
                        color: '#252e30',
                        borderRadius: 5,
                        cursor: 'pointer',
                      }}
                    >
                      <CardContent sx={cardFlex}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <FacebookOutlinedIcon sx={{ fontSize: '6rem', color: '#5270a4' }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Box>
                <Box sx={{ px: 3 }}>
                  <Card sx={{ height: '140px', backgroundColor: '#c0598f3d', color: '#252e30', borderRadius: 5 }}>
                    <CardContent sx={cardFlex}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <InstagramIcon sx={{ fontSize: '6rem', color: '#c0598f' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container fixed>
        <Box my={8} sx={{ display: 'none' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
            Team Management
          </Typography>
          <TeamManagement />
        </Box>
        <Box my={8}>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
            Partners
          </Typography>
          <Box sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={1}>
              {partners?.map((partner) => {
                return (
                  <Grid item xs={4} md={2}>
                    <Box sx={{ display: 'flex', height: '80px' }}>
                      <CardMedia component="img" image={partner.image} className={classStyle.cardImage} />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
        <Box mb={8}>
          <Typography variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
            ที่เที่ยวยอดนิยมในไทย
          </Typography>
          <Typography>
            {resortZones?.map((zone) => {
              return (
                <Link href={`/list?zone=${zone.id}`} key={zone.id} className={classStyle.interesting}>
                  {zone.name}
                </Link>
              );
            })}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const banner = await Api.get(`/banner?isActive=true`, { httpsAgent: agent });
    const resortZone = await Api.get(`/resort-zone?isActive=true`, { httpsAgent: agent });
    const resortCategory = await Api.get(`/resort-category?isActive=true`, { httpsAgent: agent });
    const partner = await Api.get(`/partner?isActive=true`, { httpsAgent: agent });
    return {
      props: {
        resortZones: resortZone.data?.items,
        resortCategories: resortCategory.data?.items,
        banners: banner.data?.items,
        partners: partner.data?.items,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Home;
