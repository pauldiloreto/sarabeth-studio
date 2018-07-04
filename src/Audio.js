import React from 'react';
import Keys from './keys';
import Loading from './Loading';
import Title from './Title';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Audio extends React.Component {
	constructor(props) {
		super(props);
		
		const Contentful = require('contentful');
		this.client = Contentful.createClient(Keys);
		this.state = { loading: true };
	}
	
	componentDidMount() {
		this.client.getEntries({ content_type: 'audio' }).then(res => {
			this.setState({
				loading: false
			});
		});
	}
	
	render() {
		const { classes } = this.props;
		
		if(this.state.loading)
			return <Loading />;
		
		return (
			<Grid container spacing={8} className={classes.container}>
				<Grid item xs={12}>
					<Title>Video</Title>
				</Grid>
				
				<Grid item xs={12}>
					&nbsp
				</Grid>
				
				<Grid item xs={12}>
					<Title>Audio</Title>
				</Grid>
			</Grid>
		);
	}
}

const styles = theme => ({
	container: {
		width: '100%',
		padding: theme.spacing.unit * 4
	}
});

export default withStyles(styles)(Audio);