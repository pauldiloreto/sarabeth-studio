import React, { ReactElement } from 'react';
import { FluidObject } from 'gatsby-image';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PlayIcon from 'mdi-material-ui/Play';
import Fade from 'react-reveal/Fade';
import Background from '../Layout/Background';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,

    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  title: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

interface ThumbnailProps {
  title: string;
  onClick: () => void;
  thumbnail: { fluid: FluidObject };
  index: number;
}

const VideoThumbnailCore = (props: ThumbnailProps): ReactElement => {
  const { title, onClick, thumbnail, index } = props;
  const classes = useStyles(props);
  const transitionDelay = 200;

  return (
    <div
      className={classes.container}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={event => {
        if (event.charCode === 13) {
          onClick();
        }
      }}
    >
      <Fade opposite delay={transitionDelay * (index + 1)} style={{ position: 'relative' }}>
        <div className={classes.title}>
          <Background sizes={thumbnail.fluid} />

          <PlayIcon style={{ fontSize: '2.5rem' }} />
          <Typography variant="body2" color="inherit" className={classes.label}>
            {title}
          </Typography>
        </div>
      </Fade>
    </div>
  );
};

export default VideoThumbnailCore;
