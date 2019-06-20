import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import LessonButtons from './LessonButtons';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: '1fr 30%',
    padding: `${theme.spacing(6)}px 10vw`,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 50%',
      padding: theme.spacing(6, 0),
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
    },
  },
  title: {
    gridColumn: '1 / 3',

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 2',
    },
  },
  markdown: {
    ...theme.typography.body1,
    padding: theme.spacing(0, 3),
    margin: 0,
    '& ul': {
      marginLeft: theme.spacing(-4),
      listStyleType: 'none',
    },
    '& ul li:before': {
      content: '"\\2014"',
      paddingRight: theme.spacing(1),
    },
    '& h1': {
      ...theme.typography.h4,
    },
  },
  verticalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  contact: {
    marginBottom: theme.spacing(2),
  },
}));

const LessonsInfo = (props) => {
  const {
    mainDescription,
    availability,
    reviewLink,
    contact,
    location,
    phoneNumber,
  } = props;
  const classes = useStyles(props);
  const transitionDelay = 500;

  return (
    <div className={classes.container}>
      <Typography variant="h2" align="center" className={classes.title}>
        <Fade bottom opposite delay={transitionDelay}>
          {'Rates & Policies'}
        </Fade>
      </Typography>

      <Fade left opposite delay={transitionDelay}>
        <div
          className={classes.markdown}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: mainDescription }}
        />
      </Fade>

      <div className={classNames(classes.markdown, classes.verticalContent)}>
        <Fade right opposite delay={transitionDelay}>
          <Typography variant="h4">Location</Typography>
          <Typography variant="body1">{location}</Typography>
        </Fade>

        <Fade right opposite delay={transitionDelay * 2}>
          <Typography variant="h4">Hours</Typography>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: availability }}
          />
        </Fade>

        <Fade right opposite delay={transitionDelay}>
          <div className={classes.contact}>
            <Typography variant="h4">Contact</Typography>
            <Typography variant="body1" component="a" href={`mailto:${contact}`}>
              {contact}
            </Typography>
            {phoneNumber && (
            <Typography variant="body1" component="a" href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </Typography>
            )}
          </div>
        </Fade>

        <LessonButtons reviewLink={reviewLink} />
      </div>
    </div>
  );
};

LessonsInfo.propTypes = {
  mainDescription: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  reviewLink: PropTypes.string,
  phoneNumber: PropTypes.string,
};
LessonsInfo.defaultProps = {
  reviewLink: null,
  phoneNumber: null,
};

export default LessonsInfo;
