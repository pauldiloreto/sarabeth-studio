import React from 'react';
import Typography from '@material-ui/core/Typography';
import Metadata from '../components/Layout/Metadata';

const NotFound = () => (
  <React.Fragment>
    <Metadata
      title="Page Not Found"
      robots="noindex, nofollow"
    />

    <Typography
      variant="h6"
      color="primary"
      align="center"
      style={{ marginTop: '2rem' }}
    >
    404 Not Found
    </Typography>
  </React.Fragment>
);

export default NotFound;