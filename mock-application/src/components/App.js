import React, {Component} from 'react';
import '../components-styles/App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Home from '../pages/Home';
import Protected from "../pages/Protected";
import NotFound from "../pages/NotFound";

const styles = theme => ({
    body: {
        backgroundColor: '#FAFAFA',
        minHeight: '100vh'
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

class App extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Router>
                <div className={classes.body}>
                    <MaterialAppBar position="static" color="primary" className={classes.root}>
                        <Toolbar>
                            {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>*/}
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                <Link to='/' className={classes.link}>
                                    {'Two Factor Authentication'}
                                </Link>
                            </Typography>
                            <Button color="inherit" component={Link} to="/protected">
                                Protected Area
                            </Button>
                        </Toolbar>
                    </MaterialAppBar>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/protected" component={Protected} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
