import React from 'react';
import Typography from 'material-ui/Typography';
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({

});

class Dashboard extends React.Component {

    render() {
        const username = this.props.location.state.username || this.props.username || '';
        return (
            <div>
                <Typography variant="display1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography gutterBottom variant="headline">
                    Welcome back {username}
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);