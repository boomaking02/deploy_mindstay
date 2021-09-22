import React from 'react';
import { Box, Paper, Typography, Container, Grid, Divider, Button } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
    },
  })
);
const Profile: React.FC = () => {
  const classStyle = useStyles();
  return (
    <Paper className={classStyle.paper} sx={{ pb: 4 }}>
      <Container fixed>
        <Box sx={{ mt: 14 }} />
        <Box sx={{ boxShadow: 5, mb: 3, p: 5, borderRadius: 5 }}>
          <Box sx={{ display: 'flex', mb: 4 }}>
            <Typography variant="h6">ข้อมูลส่วนบุคคล</Typography>
          </Box>
          <Grid container>
            {/* name */}
            <Grid item xs={6}>
              <Typography>ชื่อ-นามสกุล</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>กบินทร์ สุดเท่</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* gender */}
            <Grid item xs={6}>
              <Typography>เพศ</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>ชาย</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* dob */}
            <Grid item xs={6}>
              <Typography>วันเกิด</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>5 ส.ค. 1999</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* email */}
            <Grid item xs={6}>
              <Typography>อีเมล</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>abc@gmail.com</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* phone */}
            <Grid item xs={6}>
              <Typography>เบอร์โทร</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>0912345678</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* address */}
            <Grid item xs={6}>
              <Typography>ที่อยู่</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography color="primary">แก้ไข</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>999 กาหฟสดฟห กสวฟหาดวสฟห าก่ฟหาสดืหฟาส</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" size="large">
              บันทึก
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Profile;
