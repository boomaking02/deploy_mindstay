import React from 'react';
import { Box, Grid, FormControlLabel, Typography, Checkbox } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';

type BedFilterProps = {
  title: string;
};

const BedFilter: React.FC<BedFilterProps> = ({ title }: BedFilterProps) => {
  return (
    <Grid container sx={{ mt: 3, fontFamily: 'Prompt' }}>
      <Grid item xs={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" alignSelf="center">
            {title}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />
          }
          label={
            <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
              เตียงคิงไซส์
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />
          }
          label={
            <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
              เตียงควีนไซส์
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />
          }
          label={
            <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
              เตียงคู่
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />
          }
          label={
            <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
              เตียงฟูก
            </Typography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default BedFilter;
