import React from 'react';
import { Box, Grid, Typography, CardMedia, Button } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';
import linew from '@src/static/img/icon/linew.png';
import qr from '@src/static/img/qr.png';

const QrCodeFilter: React.FC = () => {
  return (
    <Box my={3} sx={{ border: '1px solid #eeeeee', p: 2, backgroundColor: '#fafafa', borderRadius: 3, boxShadow: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CardMedia component="img" src={qr.src} sx={{ width: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography sx={{ fontSize: '0.7rem', fontFamily: 'Prompt', fontWeight: 500 }}>
            สวัสดีค่ะ นอกจากจองผ่านเว็บไซต์แล้ว คุณสามารถจองผ่านแอดมินของเรา โดยตรงได้ โดยช่องทางเพิ่มเพื่อนไลน์
            Official นี้ นอกจากนี้คุณจะได้รับข่าวสารโปรโมชั่น พิเศษ ของเราผ่านไลน์@ อีกด้วย
          </Typography>
          <Button
            fullWidth
            color="success"
            sx={{ backgroundColor: '#00C200' }}
            startIcon={<CardMedia component="img" src={linew.src} sx={{ width: '20px' }} />}
            variant="contained"
          >
            <Typography sx={{ color: 'white' }}>@mindstay</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QrCodeFilter;
