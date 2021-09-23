import React from 'react';
import { Box, Grid, Radio, Checkbox, FormControlLabel, Typography, CardMedia } from '@mui/material';
import Image from 'next/image';
import checkboxIcon from '@src/static/img/checkbox.svg';
import checkboxIconChecked from '@src/static/img/checkbox_checked.svg';
import landmark from '@src/static/img/icon/landmark.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type FilterProps = {
  title: string;
  inputType: 'checkbox' | 'radio';
  items: Array<{ id: number; label: string }>;
};

const ResortFilter: React.FC<FilterProps> = ({ title, inputType, items }: FilterProps) => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={landmark} />
          </Box>
          <Box component="span" alignSelf="center">
            {title}
          </Box>
        </Box>
      </Grid>

      {items.map((item) => {
        const input =
          inputType === 'checkbox' ? (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CardMedia component="img" src={checkboxIcon.src} sx={{ width: '20px' }} />}
                  checkedIcon={<CardMedia component="img" src={checkboxIconChecked.src} sx={{ width: '20px' }} />}
                />
              }
              label={<Typography noWrap>{item.label}</Typography>}
            />
          ) : (
            <FormControlLabel control={<Radio />} label={<Typography noWrap>{item.label}</Typography>} />
          );
        return (
          <Grid item md={6} xs={6} key={item.id}>
            {input}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ResortFilter;
