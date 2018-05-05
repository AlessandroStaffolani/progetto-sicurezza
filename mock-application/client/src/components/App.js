import React, {Component} from 'react';
import '../components-styles/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import AppBar from './AppBar';

import Home from '../pages/Home';
import Protected from "../pages/Protected";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

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

        this.state = {
            isAuthenticated: false,
            showForbidden: false
        };

        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleCloseAlert = () => {
        this.setState({ showForbidden: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Router>
                <div className={classes.body}>
                    <AppBar pages={pages} title={'Two Factor Authentication'}/>
                    <Switch>
                        <Route exact path="/" render={
                            (props) =>
                                <Home {...props}
                                      showForbidden={this.state.showForbidden}
                                      handleClose={this.handleCloseAlert}
                                />}
                        />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/protected" component={Protected} isAuthenticated={this.state.isAuthenticated} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
    <Route
        {...rest}
        render={props =>
            props.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {
                            from: props.location,
                            forbidden: true,
                        }
                    }}
                />
            )
        }
    />
)};

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
