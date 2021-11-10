import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, CardMedia, Container, Grid, Stack, Typography, Button, Divider } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import Ac from '@src/static/img/ac.png';
import dbd from '@src/static/img/bns_registered.png';
import LineIcon from '@src/static/img/icon/line.png';
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
  fontFamily: 'Bai Jamjuree',
  zIndex: 999,
});
const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' };
const Footer: React.FC = () => {
  return (
    <>
      <FooterRoot>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ borderRight: { xs: 'none', sm: '1px solid white' }, mb: 3 }}>
              <Box sx={{ px: 5 }}>
                <Box sx={{ display: 'flex', pl: 3, justifyContent: 'center' }}>
                  <CardMedia component="img" image={Ac.src} sx={{ width: '100%' }} />
                </Box>

                <Typography variant="h5" sx={{ my: 1, mt: 4, fontFamily: 'Prompt' }}>
                  ช่องทางการชำระ
                </Typography>
                <Stack direction="row" spacing={2} ml={2}>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm1Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm2Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm3Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm4Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm5Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={flexCenter}>
                    <CardMedia component="img" image={pm6Icon.src} sx={{ height: '30px', objectFit: 'contain' }} />
                  </Box>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm sx={{ mt: 4 }}>
              <Grid container spacing={1} sx={{ pl: 5 }}>
                <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                  <Stack spacing={1} sx={{ fontSize: '0.8rem', color: 'rgba(205,208,209,1.00)' }}>
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
                  <Stack spacing={1} sx={{ fontSize: '0.8rem', color: 'rgba(205,208,209,1.00)' }}>
                    <Box>Contract</Box>
                    <Box>Whitepaper </Box>
                    <Box>Tokenomics</Box>
                    <Box>Roadmap</Box>
                    <Box>Github</Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
                  <Stack spacing={1} sx={{ fontSize: '0.8rem', color: 'rgba(205,208,209,1.00)' }}>
                    <Box>นโยบายความเป็นส่วนตัว</Box>
                    <Box>ข้อกำหนดการใช้บริการ</Box>
                    <Box>นโยบายเกี่ยวกับคุกกี้</Box>
                  </Stack>
                </Grid>
                <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'inline' } }} />
                <Grid item xs={12} sm={8} sx={{ mt: { xs: 0, md: '-4.6rem' } }}>
                  <Divider sx={{ border: '1px solid #F8E8E8', opacity: '0.5', mb: 2 }} />
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minWidth: { xs: '100%', md: '850px' }, ml: { xs: 0, md: '-14rem' } }}
                  >
                    <Grid item xs={12} sm={3}>
                      <Box sx={flexCenter}>
                        <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 4 }} fullWidth>
                          <Typography variant="h6" sx={{ fontFamily: 'Prompt' }}>
                            ติดต่อเรา
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
                        Mindstay Journey Co., Ltd
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <PersonIcon />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 200 }}>
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
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 200 }}>082 5322 491</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <EmailIcon />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 200 }}>info@mindstay.co.th</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <CardMedia component="img" image={dbd.src} />
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
