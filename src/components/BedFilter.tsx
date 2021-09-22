import React from 'react';
import { Box, Grid, FormControlLabel, Typography, Stack, Checkbox, CardMedia } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';
import checkboxIcon from '@public/static/img/checkbox.svg';
import checkboxIconChecked from '@public/static/img/checkbox_checked.svg';

type BedFilterProps = {
  title: string;
};

const BedFilter: React.FC<BedFilterProps> = ({ title }: BedFilterProps) => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" alignSelf="center">
            {title}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack direction={{ xs: 'row', md: 'column' }}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CardMedia component="img" src={checkboxIcon.src} sx={{ width: '20px' }} />}
                checkedIcon={<CardMedia component="img" src={checkboxIconChecked.src} sx={{ width: '20px' }} />}
              />
            }
            label={<Typography noWrap>เตียงคิงไซส์</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<CardMedia component="img" src={checkboxIcon.src} sx={{ width: '20px' }} />}
                checkedIcon={<CardMedia component="img" src={checkboxIconChecked.src} sx={{ width: '20px' }} />}
              />
            }
            label={<Typography noWrap>เตียงควีนไซส์</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<CardMedia component="img" src={checkboxIcon.src} sx={{ width: '20px' }} />}
                checkedIcon={<CardMedia component="img" src={checkboxIconChecked.src} sx={{ width: '20px' }} />}
              />
            }
            label={<Typography noWrap>เตียงคู่</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<CardMedia component="img" src={checkboxIcon.src} sx={{ width: '20px' }} />}
                checkedIcon={<CardMedia component="img" src={checkboxIconChecked.src} sx={{ width: '20px' }} />}
              />
            }
            label={<Typography noWrap>เตียงฟูก</Typography>}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BedFilter;
