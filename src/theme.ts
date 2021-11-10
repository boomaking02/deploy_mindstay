import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F05D76',
    },
    success: {
      main: '#85c341',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: ['Bai Jamjuree', 'Prompt', 'Roboto'].join(','),
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

export default theme;
