import React from 'react';
import { Box, Pagination } from '@mui/material/';
import { createTheme } from '@mui/material/styles';

type PaginationProps = {
  count: number;
};

const theme = createTheme();

const PaginationComp: React.FC<PaginationProps> = ({ count }: PaginationProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3, 0) }}>
      <Pagination count={count} />
    </Box>
  );
};

export default PaginationComp;
