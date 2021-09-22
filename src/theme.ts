import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F05D76',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: ['Prompt'].join(','),
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            color: '#F05D76',
          },
        },
      },
    },
  },
});

export default theme;
