import React, {Component} from 'react';
import '../components-styles/App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import AppBar from './AppBar';
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

const pages = [
    {
        id: 0,
        code: 'home',
        label: 'Home',
        path: '/'
    },
    {
        id: 1,
        code: 'protected',
        label: 'Protected Area',
        path: '/protected'
    }
];

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Router>
                <div className={classes.body}>
                    <AppBar pages={pages} title={'Two Factor Authentication'}/>
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
