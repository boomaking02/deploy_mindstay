import React from 'react';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { Box, Grid, Typography, CardMedia, Button } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';
import linew from '@src/static/img/linew.png';
import qr from '@src/static/img/qr.png';

const QrCodeFilter: React.FC = () => {
  return (
    <Box my={3} sx={{ border: '1px solid #C4C4C4', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CardMedia component="img" src={qr.src} sx={{ width: '50%' }} />
          </Box>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography variant="body2">
            สวัสดีค่ะ นอกจากจองผ่านเว็บไซต์แล้ว คุณสามารถจองผ่านแอดมินของเรา โดยตรงได้ โดยช่องทางเพิ่มเพื่อนไลน์ offical
            นี้ นอกจากนี้คุณจะได้รับข่าวสารโปรโมชั่น พิเศษ ของเราผ่านไลน์@ อีกด้วย
          </Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button startIcon={<PhoneInTalkIcon />} fullWidth variant="contained">
            โทร 0825322491
          </Button>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button
            fullWidth
            color="success"
            sx={{ backgroundColor: '#00C200' }}
            startIcon={<CardMedia component="img" src={linew.src} sx={{ width: '20px' }} />}
            variant="contained"
          >
            @mindstay
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QrCodeFilter;
