import React from 'react';
import { Paper, Box, Stack, CircularProgress, Typography } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <>
      <Paper sx={{ py: 20 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" disableShrink />
            </Box>

            <Typography variant="h4" color="primary">
              Loading...
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
export default Loader;
