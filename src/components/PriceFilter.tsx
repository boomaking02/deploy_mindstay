import React from 'react';
import { Box, Grid, Radio, FormControlLabel, Typography, RadioGroup } from '@mui/material';
import Image from 'next/image';
import money from '@src/static/img/icon/money.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type PriceFilterProps = {
  title: string;
  items: Array<{ id: number; label: string }>;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ title, items }: PriceFilterProps) => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={money} />
          </Box>
          <Box component="span" alignSelf="center" sx={{ fontFamily: 'Prompt' }}>
            {title}
          </Box>
        </Box>
      </Grid>
      <RadioGroup row name="price" defaultValue="1">
        {items.map((item) => {
          const input = (
            <FormControlLabel
              value={String(item.id)}
              control={
                <Radio
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
          );
          return (
            <Grid item xs={6} md={12} key={item.id}>
              {input}
            </Grid>
          );
        })}
      </RadioGroup>
    </Grid>
  );
};

export default PriceFilter;
