import { createMuiTheme } from '@material-ui/core/styles';

const primary = {
  light: '#E8C3B8',
  main: '#C66470',
  dark: '#B24D59',
  contrastText: '#F4F4E0',
};

const secondary = {
  light: '#F4F4E0',
  main: '#E8C3B8',
  dark: '#443F3E',
  contrastText: '#1A1A1A',
};

const rawTheme = {
  palette: {
    primary,
    secondary,
    background: {
      default: secondary.contrastText,
    },
  },
  typography: {
    fontFamily: "'Muli', sans-serif",
    h1: {
      color: primary.main,
      fontFamily: "'Muli', sans-serif",
      fontSize: '3.75rem',
    },
    h2: {
      color: secondary.main,
      paddingBottom: '1.5rem',
      fontFamily: "'Muli', sans-serif",
      fontSize: '2rem',
    },
    h3: {
      fontFamily: "'Playfair Display', cursive",
      fontStyle: 'italic',
    },
    h4: {
      color: secondary.light,
      fontSize: '1.5rem',
      textTransform: 'uppercase',
      paddingBottom: 0,
      margin: 0,
    },
    body1: {
      fontSize: '1rem',
      paddingBottom: '1.5rem',
      color: primary.contrastText,
    },
    subtitle1: {
      color: primary.contrastText,
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        zIndex: 1,
      },
    },
    MuiOutlinedInput: {
      root: {
        color: primary.contrastText,
      },
    },
    MuiInputLabel: {
      root: {
        color: primary.contrastText,
      },
    },
    MuiButton: {
      outlined: {
        color: primary.contrastText,
        border: `1px solid ${primary.contrastText}`,
        borderRadius: 0,
        textTransform: 'none',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#515146',
      },
    },
  },
};

const theme = createMuiTheme(rawTheme);
export default theme;
