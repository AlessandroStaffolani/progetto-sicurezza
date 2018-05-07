import React, {Component} from 'react';
import '../components-styles/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import AppBar from './AppBar';
import config from '../config';

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

const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            showForbidden: false,
            username: {
                value: '',
                error: false,
                errorMsg: ''
            },
            password:  {
                value: '',
                error: false,
                errorMsg: ''
            },
            token: {
                value: '',
                error: false,
                errorMsg: ''
            },
            showPassword: false,
            firstFactor: true,
            redirectToProtected: false
        };

        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirectToProtected = this.handleRedirectToProtected.bind(this);
    }

    handleCloseAlert = () => {
        this.setState({ showForbidden: false });
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: {
                value: event.target.value,
                error: false,
                errorMsg: ''
            }
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.firstFactor) {
            this.handleFirstFactor();
        } else {
            this.handleSecondFactor();
        }
    };

    handleFirstFactor = () => {
        let { username, password } = this.state;
        let errors = false;
        if (username.value === '') {
            errors = true;
            username.error = true;
            username.errorMsg = 'This field is required';
        }

        if (password.value === '') {
            errors = true;
            password.error = true;
            password.errorMsg = 'This field is required';
        }

        if (errors) {
            this.setState({
                username: username,
                password: password
            });
        } else {

            const requestPath = config.host + config.apiName + 'auth/authenticate/first';

            let userData = {
                username: username.value,
                password: password.value
            };

            fetch(requestPath, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify(userData)
            })
                .then(result => result.json())
                .then(response => {
                    if (response.errors.length > 0) {
                        // error
                        const errors = response.errors;
                        errors.map(err => {
                            if (err.field === 'username') {
                                username.error = true;
                                username.errorMsg = err.message;
                            }
                            if (err.field === 'password') {
                                password.error = true;
                                password.errorMsg = err.message;
                            }
                        });
                        password.value = '';
                        this.setState({
                            username: username,
                            password: password
                        });
                    } else {
                        // success
                        const authenticationData = response.data;
                        console.log(authenticationData);
                        this.setState({
                            firstFactor: false
                        })
                    }
                })
                .catch(errors => console.log(errors));
        }
    };

    handleSecondFactor = () => {
        let { username, token } = this.state;
        let errors = false;

        if (token.value === '') {
            errors = true;
            token.error = true;
            token.errorMsg = 'This field is required';
        }

        if (errors) {
            this.setState({
                token: token
            });
        } else {
            // register
            const requestPath = config.host + config.apiName + 'auth/verify/second';

            let userData = {
                username: username.value,
                token: token.value,
                isConfig: false
            };

            fetch(requestPath, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify(userData)
            })
                .then(result => result.json())
                .then(response => {
                    console.log(response);
                    const errors = response.errors;

                    if (errors.length > 0) {
                        // error
                        errors.map(err => {
                            if (err.field === 'token') {
                                token.error = true;
                                token.errorMsg = err.message;
                            }
                        });
                        token.value = '';
                        this.setState({
                            token: token,
                            isAuthenticated: false,
                            redirectToProtected: false
                        });
                    } else {
                        // success
                        const verified = response.data;
                        console.log(verified);
                        this.setState({
                            isAuthenticated: true,
                            redirectToProtected: true
                        });
                        //this.props.history.push('/protected');
                    }

                })
                .catch(errors => console.log(errors))
        }
    };

    handleRedirectToProtected = (history) => {
        if (this.state.redirectToProtected) {
            history.push('/protected');
            this.setState({
                redirectToProtected: false
            })
        }
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
                                      username={this.state.username}
                                      password={this.state.password}
                                      token={this.state.token}
                                      showPassword={this.state.showPassword}
                                      firstFactor={this.state.firstFactor}
                                      handleClickShowPassword={this.handleClickShowPassword}
                                      handleMouseDownPassword={this.handleMouseDownPassword}
                                      handleChange={this.handleChange}
                                      handleSubmit={this.handleSubmit}
                                      redirectToProtected={this.state.redirectToProtected}
                                      handleRedirectToProtected={this.handleRedirectToProtected}
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

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => {

    return (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
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
