import React from 'react';
import { Box, Grid, Radio, Checkbox, FormControlLabel, Typography, GridSize, RadioGroup } from '@mui/material';
import Image from 'next/image';
import landmark from '@src/static/img/icon/landmark.png';
import 'react-alice-carousel/lib/alice-carousel.css';

type FilterProps = {
  title: string;
  inputType: 'checkbox' | 'radio';
  searchParams: string;
  items: Array<{ id: number; name: string; value?: string }>;
  column: GridSize;
  onFilter: (q: string, searchParams: string, isCheck: boolean, inputType: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams: any;
};

const ResortFilter: React.FC<FilterProps> = ({
  title,
  inputType,
  items,
  searchParams,
  onFilter,
  column,
  queryParams,
}: FilterProps) => {
  let queryValue = queryParams[searchParams];
  if (!['price', 'isPetAllowed'].includes(searchParams)) {
    queryValue = queryParams[searchParams]?.split(',');
  }

  const formInput = items?.map((item) => {
    const value = item.value ? item.value : item.id.toString();

    let isChecked = false;
    if (queryValue) {
      isChecked = typeof queryValue === 'object' ? queryValue.includes(value) : queryValue === value;
    }

    const input =
      inputType === 'checkbox' ? (
        <FormControlLabel
          control={
            <Checkbox
              value={value}
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
              defaultChecked={isChecked}
              onChange={(e) => onFilter(e.target.value, searchParams, e.target.checked, inputType)}
            />
          }
          label={
            <Typography noWrap sx={{ fontFamily: 'Prompt' }}>
              {item.name}
            </Typography>
          }
        />
      ) : (
        <FormControlLabel
          control={
            <Radio
              value={item.value}
              sx={{
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
              onChange={(e) => onFilter(e.target.value, searchParams, e.target.checked, inputType)}
            />
          }
          label={<Typography noWrap>{item.name}</Typography>}
        />
      );
    return (
      <Grid item md={column} xs={6} key={item.id}>
        {input}
      </Grid>
    );
  });

  return (
    <Grid
      container
      sx={{
        fontFamily: 'Prompt',
        mt: 3,
        border: '1px solid #eeeeee',
        p: 2,
        backgroundColor: '#fafafa',
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <Grid item xs={12}>
        <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 24, display: 'flex' }}>
          <Box sx={{ alignSelf: 'center', width: '20px', mr: '0.5rem' }}>
            <Image src={landmark} />
          </Box>
          <Box alignSelf="center">{title}</Box>
        </Box>
      </Grid>
      {inputType === 'checkbox' ? (
        formInput
      ) : (
        <RadioGroup row name={searchParams} defaultValue={queryValue} aria-label={searchParams}>
          {formInput}
        </RadioGroup>
      )}
    </Grid>
  );
};

export default ResortFilter;
