import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, CardMedia, Paper, Typography, Container, Breadcrumbs, Stack } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Link from 'next/link';
import contentImage from '@public/static/img/content.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 40,
      height: '100%',
      cursor: 'pointer',
    },
    cardBorder: {
      border: '2px solid #c7c4c4',
      borderRadius: 40,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);
const InterestDetail: React.FC = () => {
  const classStyle = useStyles();
  const breadcrumbs = [
    <Link href="/" key="1">
      <MuiLink underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
        Home
      </MuiLink>
    </Link>,
    <Typography key="2" color="primary">
      แอดเวนเจอร์
    </Typography>,
  ];
  return (
    <Paper className={classStyle.paper} sx={{ pb: 4 }}>
      <Container fixed>
        <Box sx={{ mt: 14 }} />
        <Box sx={{ boxShadow: 5, mb: 3, p: 2, borderRadius: 5 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Box mt={2} />
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Kabin Autchariyasuwan
                </Typography>
                <Typography variant="body2" sx={{ color: '#676767' }}>
                  10/9/2564
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <CardMedia component="img" src={contentImage.src} />
        </Box>
      </Container>
    </Paper>
  );
};

export default InterestDetail;
