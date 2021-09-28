import React, { ReactElement, ReactText } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'inline-block',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 4),
    fontSize: '2rem',
  },
}));

interface TitleProps {
  children: ReactText;
}

const Title = (props: TitleProps): ReactElement => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        {children}
      </Typography>
    </div>
  );
};

export default Title;
