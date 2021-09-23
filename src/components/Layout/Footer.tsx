import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, CardMedia, Container, Grid, Stack, Typography, Button } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import Ac from '@src/static/img/ac.png';
import LineIcon from '@src/static/img/line.png';
import pm1Icon from '@src/static/img/pm1.png';
import pm2Icon from '@src/static/img/pm2.png';
import pm3Icon from '@src/static/img/pm3.png';
import pm4Icon from '@src/static/img/pm4.png';
import pm5Icon from '@src/static/img/pm5.png';
import pm6Icon from '@src/static/img/pm6.png';

const theme = createTheme();

const FooterRoot = styled('footer')({
  backgroundColor: '#272727',
  color: '#fff',
  padding: theme.spacing(4, 0),
  fontFamily: 'Prompt',
  zIndex: 999,
});
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' };
const Footer: React.FC = () => {
  return (
    <>
      <FooterRoot>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} sm={5} sx={{ borderRight: { xs: 'none', sm: '1px solid white' }, mb: 3 }}>
              <Box sx={{ px: 5 }}>
                <CardMedia component="img" image={Ac.src} sx={{ width: '100%' }} />
                <Typography variant="h6" sx={{ my: 1 }}>
                  ช่องทางการชำระ
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm1Icon.src} sx={{ height: '30px' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm2Icon.src} sx={{ height: '30px' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm3Icon.src} sx={{ height: '30px' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm4Icon.src} sx={{ height: '30px' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm5Icon.src} sx={{ height: '30px' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm6Icon.src} sx={{ height: '30px' }} />
                  </Box>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm>
              <Grid container spacing={1} sx={{ pl: 2 }}>
                <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                  <Box mb={2}>
                    <Typography variant="h5">เกี่ยวกับ</Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Box>ช่วยเหลือ & คำแนะนำ</Box>
                    <Box>คำถามที่พบบ่อย</Box>
                    <Box>เป็นพาร์ทเนอร์กับเรา</Box>
                    <Box>มาตรการ COVID 19</Box>
                    <Box>ประชาสัมพันธ์</Box>
                    <Box>สารจากผู้ก่อตั้ง</Box>
                    <Box>บัตร Vourchers</Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                  <Box mb={2}>
                    <Typography variant="h5">Token Pages</Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Box>Contract</Box>
                    <Box>Whitepaper </Box>
                    <Box>Tokenomics</Box>
                    <Box>Roadmap</Box>
                    <Box>Github</Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                  <Box mb={2}>
                    <Typography variant="h5">Term & policies</Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Box>นโยบายความเป็นส่วนตัว</Box>
                    <Box>ข้อกำหนดการใช้บริการ</Box>
                    <Box>นโยบายเกี่ยวกับคุกกี้</Box>
                  </Stack>
                </Grid>
                <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'inline' } }} />
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={flexCenter}>
                        <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 4 }} fullWidth>
                          <Typography variant="h6">ติดต่อเรา</Typography>
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
                        Mindstay Journey Co., Ltd
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <PersonIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2">
                            818/10 Indy 2, Soi Pracha Uthit 90, Nai Khlong Bang Pla Kot, Phra Samut Chedi District,
                            Samut Prakan 10290
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <PhoneInTalkIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2">082 5322 491</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <EmailIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2">Mindstay@gmail.co.th</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </FooterRoot>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
        <Typography>© 2021 Mindstay</Typography>
        <Box sx={{ ml: 10 }}>
          <Stack direction="row" spacing={2}>
            <Box sx={flexCenter}>
              <FacebookOutlinedIcon />
            </Box>
            <Box sx={flexCenter}>
              <CardMedia component="img" image={LineIcon.src} sx={{ maxWidth: '23px' }} />
            </Box>
            <Box sx={flexCenter}>
              <InstagramIcon />
            </Box>
            <Box sx={flexCenter}>
              <YouTubeIcon />
            </Box>
            <Box sx={flexCenter}>
              <GitHubIcon />
            </Box>
            <Box sx={flexCenter}>
              <TelegramIcon />
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
