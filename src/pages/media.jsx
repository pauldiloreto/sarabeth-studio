import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Metadata from '../components/Layout/Metadata';
import VideoSection from '../components/Video/VideoSection';
import AudioSection from '../components/Audio/AudioSection';

const MediaCore = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Metadata
        title="Sarabeth's Recordings"
        description="Sarabeth Belón's media page: recordings and videos. Listen to recordings of her opera arias and art songs. Clips of her performances are also available."
      />

      <div className={classes.container}>
        <VideoSection />
        <AudioSection />
      </div>
    </React.Fragment>
  );
};
MediaCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(MediaCore);