import React from 'react';
import { Box, Grid, Radio, FormControlLabel, Typography, RadioGroup } from '@mui/material';
import Image from 'next/image';
import pet from '@src/static/img/icon/pet.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type PedFilterProps = {
  title: string;
};

const PetFilter: React.FC<PedFilterProps> = ({ title }: PedFilterProps) => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box component="span" sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={pet} />
          </Box>
          <Box component="span" alignSelf="center">
            {title}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6} md={12}>
        <RadioGroup row name="ped" defaultValue="1">
          <FormControlLabel
            value="อนุญาต"
            control={<Radio color="default" />}
            label={<Typography noWrap>อนุญาต</Typography>}
          />
          <FormControlLabel
            value="ไม่อนุญาต"
            control={<Radio color="default" />}
            label={<Typography noWrap>ไม่อนุญาต</Typography>}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default PetFilter;
