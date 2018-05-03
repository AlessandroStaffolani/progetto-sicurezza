import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 5
    }
});

class Container extends React.Component {

    render() {
        const { classes, children} = this.props;

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { location: this.props.location }));

        return (
            <Grid className={classes.container} container justify={'center'} spacing={0}>
                <Grid item xs={12} sm={10} md={10}>
                    {childrenWithProps}
                </Grid>
            </Grid>
        )
    }
}

Container.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Container);