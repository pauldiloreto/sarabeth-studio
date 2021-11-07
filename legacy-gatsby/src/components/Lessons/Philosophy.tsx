import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import Fade from 'react-reveal/Fade';
import LessonButtons from './LessonButtons';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    minHeight: '50vh',
    padding: theme.spacing(6, 2),

    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(6)}px 10vw`,
    },
  },
  background: {
    filter: 'brightness(20%)',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 2),

    '& p': {
      ...theme.typography.body1,
      margin: 0,
    },
    '& h1': {
      ...theme.typography.h2,
      margin: 0,
    },
  },
}));

interface PhilosophyProps {
  aboutDescription: string;
  contact: string;
  phoneNumber: string;
  reviewLink: string;
}

const Philosophy = (props: PhilosophyProps): ReactElement => {
  const { aboutDescription, contact, phoneNumber, reviewLink } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Fade bottom opposite delay={500}>
        <div
          className={classes.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: aboutDescription }}
        />
      </Fade>

      <div className={classes.buttonGroup}>
        <LessonButtons contact={contact} phoneNumber={phoneNumber} reviewLink={reviewLink} />
      </div>
    </div>
  );
};

export default Philosophy;
