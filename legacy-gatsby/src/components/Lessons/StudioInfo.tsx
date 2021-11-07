import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fade from 'react-reveal/Fade';
import LessonButtons from './LessonButtons';
import Lightbox from '../Photos/Lightbox';
import { Photo } from '../../types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 30%',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    padding: `${theme.spacing(6)}px 10vw`,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '50% 50%',
      padding: theme.spacing(6, 2),
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
    },
  },
  gridItem: {
    padding: theme.spacing(0, 4),
  },
  content: {
    ...theme.typography.body1,
    padding: 0,
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
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    border: 'none',
    margin: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  centerButton: {
    gridColumn: '1 / 3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 2',
    },
  },
  photoGallery: {
    cursor: 'pointer',
  },
}));

interface StudioInfoProps {
  contact: string;
  phoneNumber: string;
  photoGallery: Photo[];
  reviewLink: string;
  teachingResume: string;
}

const StudioInfo = (props: StudioInfoProps): ReactElement => {
  const { contact, phoneNumber, photoGallery, reviewLink, teachingResume } = props;
  const classes = useStyles(props);
  const [currentPhoto, setPhoto] = useState(null);
  const transitionDelay = 500;

  return (
    <>
      {photoGallery?.length > 0 && (
        <Lightbox images={photoGallery} onClose={() => setPhoto(null)} photoIndex={currentPhoto} onChange={setPhoto} />
      )}
      <div className={classes.container}>
        <div className={classes.gridItem}>
          <Typography variant="h2" align="center">
            <Fade top opposite>
              Teaching Resume
            </Fade>
          </Typography>

          <Fade left opposite delay={transitionDelay}>
            <div
              className={classes.content}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: teachingResume }}
            />
          </Fade>
        </div>

        {photoGallery?.length > 0 && (
          <div className={classes.gridItem}>
            <Fade right opposite delay={transitionDelay * 2}>
              <Typography variant="h2" align="center">
                Photos
              </Typography>

              <GridListTile component="div" className={classes.photoGallery} onClick={() => setPhoto(0)}>
                <Img fluid={photoGallery[0].thumbnail} alt={photoGallery[0].title} />
                <GridListTileBar title={<Typography variant="subtitle1">View Sarabeth&apos;s Studio</Typography>} />
              </GridListTile>
            </Fade>
          </div>
        )}

        <div className={classes.centerButton}>
          <LessonButtons contact={contact} phoneNumber={phoneNumber} reviewLink={reviewLink} />
        </div>
      </div>
    </>
  );
};

export default StudioInfo;
