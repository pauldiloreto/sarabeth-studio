import React, { ReactElement } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactSVG } from 'react-svg';
import Navigation from './Navigation';
import MiniNavigation from './MiniNavigation';
import { transitionDelay } from './PageTransition';
import { LocationProps } from '../../types';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    flexShrink: 0,
    transition: `background-color ${transitionDelay}ms ease-in-out`,
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: `background-color ${transitionDelay}ms ease-in-out`,
  },
  brandText: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    fontSize: '2rem',
    fontFamily: theme.typography.h3.fontFamily,

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: 0,
      width: '100%',
      justifyContent: 'center',
      zIndex: -1,
    },
  },
  brandContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },
  logoSvg: {
    width: 100,
    height: '100%',
    marginRight: theme.spacing(1),

    '& path': {
      fill: theme.palette.primary.contrastText,
    },

    [theme.breakpoints.down('xs')]: {
      width: 60,
    },
  },
}));

interface HeaderProps extends LocationProps {
  logo: string;
  resume: string;
}

const Header = (props: HeaderProps): ReactElement => {
  const { location, logo, resume } = props;
  const classes = useStyles(props);
  const isHome = location.pathname === '/';

  return (
    <AppBar position="sticky" className={`${classes.appBar} ${isHome ? classes.transparent : ''}`}>
      <Toolbar>
        <div className={classes.brandContainer}>
          {!isHome && (
            <Link to="/">
              <ReactSVG
                src={logo}
                beforeInjection={svg => {
                  svg.classList.add(classes.logoSvg);
                }}
              />
            </Link>
          )}
          {!isHome && (
            <Typography className={classes.brandText} variant="h6" color="inherit">
              Sarabeth Belón
            </Typography>
          )}
        </div>

        <Navigation location={location} resume={resume} />

        <MiniNavigation location={location} resume={resume} />
      </Toolbar>
    </AppBar>
  );
};

const HeaderWithData = (props: LocationProps): ReactElement => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        contentfulAbout {
          resume {
            file {
              url
            }
          }
          brandLogo {
            file {
              url
            }
          }
        }
      }
    `}
    render={data => (
      <Header location={props.location} logo={data.contentfulAbout.brandLogo.file.url} resume={data.contentfulAbout.resume.file.url} />
    )}
  />
);

export default HeaderWithData;
