import React from 'react';
import { Box, Pagination } from '@mui/material/';
import { createTheme } from '@mui/material/styles';

type PaginationProps = {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

const theme = createTheme();

const PaginationComp: React.FC<PaginationProps> = ({ ...props }: PaginationProps) => {
  const { count, page, onPageChange } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3, 0) }}>
      <Pagination count={count} page={page} onChange={onPageChange} />
    </Box>
  );
};

export default PaginationComp;
