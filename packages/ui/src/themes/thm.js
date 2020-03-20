import { color, radius, time } from '../settings';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

let thm = createMuiTheme();

thm.overrides = {
  MuiTooltip: {
    tooltip: {
      backgroundColor: color.mono100,
      color: color.mono800,
      fontSize: thm.typography.pxToRem(13),
      fontWeight: thm.typography.fontWeightRegular,
    },
  },
  MuiIconButton: {
    root: {
      backgroundColor: color.shadow300,
      borderRadius: radius.x,
      color: color.mono100,
      transition: `none`,
      padding: 6,
      '&:hover': {
        backgroundColor: color.mono900,
        color: color.mono100,
      },
      '&$disabled': {
        backgroundColor: color.shadow500,
        color: color.flare500,
      },
    },
  },
};

thm.palette = {
  ...thm.palette,
  common: {
    black: color.mono900,
    white: '#fff',
  },
};
thm.props = {
  ...thm.props,
  MuiButtonBase: {
    disableRipple: true,
  },
};

thm.shape = {
  ...thm.shape,
  borderRadius: radius.x,
};

export default thm;