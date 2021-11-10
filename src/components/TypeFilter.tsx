import React from 'react';
import { Box, Grid, Radio, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Image from 'next/image';
import exp from '@src/static/img/icon/exp.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type TypeFilterProps = {
  title: string;
  inputType: 'checkbox' | 'radio';
  items: Array<{ id: number; label: string }>;
};

const TypeFilter: React.FC<TypeFilterProps> = ({ title, inputType, items }: TypeFilterProps) => {
  return (
    <Grid container sx={{ mt: 3, fontFamily: 'Prompt' }}>
      <Grid item sm={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={exp} />
          </Box>
          <Box alignSelf="center">{title}</Box>
        </Box>
      </Grid>

      {items.map((item) => {
        const input =
          inputType === 'checkbox' ? (
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
                  {item.label}
                </Typography>
              }
            />
          ) : (
            <FormControlLabel
              control={<Radio />}
              label={
                <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
                  {item.label}
                </Typography>
              }
            />
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
