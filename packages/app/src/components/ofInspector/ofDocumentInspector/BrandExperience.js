import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../reducers/data';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardMedia: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardLabel: {
    display: 'block',
    margin: '0 !important',
    width: '100%',
  },
}));

export default connect(({ data }) => ({ data }), { update })(({ data, update, ...props }) => {
  const classes = useStyles();

  const { currentProject } = data;
  const { basepath } = currentProject;
  const { site } = currentProject;
  const { brand } = site;

  const [state, setState] = React.useState({
    backgColor: brand.backgColor,
    brandColor: brand.brandColor,
    textColor: brand.textColor,
    typography: brand.typography,
  });

  const handleUpdate = payload => {
    update({
      currentProject: {
        ...currentProject,
        site: {
          ...site,
          brand: {
            ...brand,
            ...payload,
          },
        },
      },
    });
  };

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputBlur = e => {
    handleUpdate({ [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = e => {
    handleUpdate({ [e.target.name]: e.target.checked });
  };

  return (
    <form noValidate autoComplete="off" className={classes.root} onSubmit={e => e.preventDefault()}>
      <FormControlLabel
        control={
          <Checkbox
            checked={brand.enableLogo}
            color="primary"
            id="enableLogo"
            name="enableLogo"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable logo</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.logo && brand.logo.name ? (
              <img alt="Logo" height="100" src={`${basepath}src/site/assets/${brand.logo.name}`} title="Logo" />
            ) : (
              <Box height="100px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={brand.enableLogo ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept="image/*"
              color="primary"
              disabled={!brand.enableLogo}
              id="logo"
              name="logo"
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="logo" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!brand.enableLogo} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={brand.enableFavicon}
            color="primary"
            id="enableFavicon"
            name="enableFavicon"
            onChange={handleCheckboxChange}
            value="true"
          />
        }
        label={<Typography variant="overline">Enable favicon</Typography>}
      />
      <FormControl variant="filled" fullWidth margin="dense">
        <Card elevation={0}>
          <CardMedia className={classes.cardMedia}>
            {brand.favicon && brand.favicon.name ? (
              <img alt="Favicon" height="36" src={`${basepath}src/site/assets/${brand.favicon.name}`} title="Favicon" />
            ) : (
              <Box height="36px" display="flex" flexDirection="column" justifyContent="center" marginTop={2}>
                <PanoramaOutlinedIcon color={brand.enableFavicon ? 'action' : 'disabled'} />
              </Box>
            )}
          </CardMedia>
          <CardActions>
            <input
              accept=".ico"
              color="primary"
              disabled={!brand.enableFavicon}
              id="favicon"
              name="favicon"
              onChange={handleInputChange}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="favicon" className={classes.cardLabel}>
              <Button color="primary" component="span" disabled={!brand.enableFavicon} fullWidth size="small">
                Choose file…
              </Button>
            </label>
          </CardActions>
        </Card>
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="brandColor">Brand color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="brandColor"
          name="brandColor"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          type="color"
          value={state.brandColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="backgColor">Background color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="backgColor"
          name="backgColor"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          type="color"
          value={state.backgColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="textColor">Text color</InputLabel>
        <FilledInput
          disableUnderline
          fullWidth
          id="textColor"
          name="textColor"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          type="color"
          value={state.textColor}
        />
      </FormControl>
      <FormControl variant="filled" fullWidth margin="dense">
        <InputLabel htmlFor="typography">Typography</InputLabel>
        <Select
          disableUnderline
          fullWidth
          id="typography"
          name="typography"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required
          type="text"
          value={state.typography}>
          <MenuItem value="modern">Modern</MenuItem>
          <MenuItem value="classic">Classic</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
});
