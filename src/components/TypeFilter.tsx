import React from 'react';
import { Box, Grid, Radio, Checkbox, FormControlLabel, Typography, CardMedia } from '@mui/material';
import Image from 'next/image';
import checkboxIcon from '@public/static/img/checkbox.svg';
import checkboxIconChecked from '@public/static/img/checkbox_checked.svg';
import exp from '@public/static/img/icon/exp.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type TypeFilterProps = {
  title: string;
  inputType: 'checkbox' | 'radio';
  items: Array<{ id: number; label: string }>;
};

const TypeFilter: React.FC<TypeFilterProps> = ({ title, inputType, items }: TypeFilterProps) => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={exp} />
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
          <Grid item xs={6} md={12} key={item.id}>
            {input}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TypeFilter;
