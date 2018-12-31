import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Navigation from './Navigation';
import MiniNavigation from './MiniNavigation';


const HeaderCore = (props) => {
  const { classes, location, resume } = props;
  const isHome = location.pathname === '/';

  return (
    <AppBar
      position="sticky"
      className={classNames({
        [classes.appBar]: true,
        [classes.transparent]: isHome,
      })}
    >
      <Toolbar>
        <Typography
          className={classes.brand}
          variant="h6"
          color="inherit"
        >
          <Link to="/">
            Sarabeth Belón
          </Link>
        </Typography>

        <Hidden smDown>
          <Navigation
            location={location}
            resume={resume}
          />
        </Hidden>
        <Hidden mdUp>
          <MiniNavigation
            location={location}
            resume={resume}
          />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

HeaderCore.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string,
    branch: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  resume: PropTypes.string.isRequired,
};

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    flexShrink: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  brand: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    fontSize: '2rem',

    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
});

const Header = withStyles(styles)(HeaderCore);

const HeaderWithData = ({ location }) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        contentfulAbout{
          resume {
            file{
              url
            }
          }
        }
      }
    `}
    render={data => (
      <Header
        location={location}
        resume={data.contentfulAbout.resume.file.url}
      />
    )}
  />
);
HeaderWithData.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeaderWithData;