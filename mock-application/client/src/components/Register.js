import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import SendIcon from '@material-ui/icons/Send';
import {Link} from "react-router-dom";
import config from '../config';
import QRCode from 'qrcode';
import FormRegister from './FormRegister';
import FormSecondFactor from './FormSecondFactor';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
    card: {

    },
    actions: {
        textAlign: 'right'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    actionLink: {
        textTransform: 'capitalize',
        margin: 0
    },
    verticalMargin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:  {
                value: '',
                error: false,
                errorMsg: ''
            },
            password: {
                value: '',
                error: false,
                errorMsg: ''
            },
            confirmPassword: {
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
            secretQRcodePath: '',
            title: 'Register'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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

        const { firstFactor } = this.state;
        if (firstFactor) {
            this.handleFirstFactor()
        } else {
            this.handleSecondFactor()
        }

    };

    handleFirstFactor = () => {
        let { username, password, confirmPassword } = this.state;
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

        if (confirmPassword.value === '') {
            errors = true;
            confirmPassword.error = true;
            confirmPassword.errorMsg = 'This field is required';
        }

        if (password.value !== confirmPassword.value) {
            errors = true;
            password.error = true;
            confirmPassword.error = true;
            confirmPassword.errorMsg = 'The two password aren\'t the same'
        }

        if (errors) {
            this.setState({
                username: username,
                password: password,
                confirmPassword: confirmPassword
            });
        } else {
            // register
            let userData = {
                username: username.value,
                password: password.value
            };

            const requestPath = config.host + config.apiName + 'user/create';

            fetch(requestPath, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify(userData)
            })
                .then(result => result.json())
                .then(response => {
                    this.loadSecondFactor(response.user.username);
                    //this.props.history.push('/', {username: response.user.username});
                })
                .catch(errors => console.log(errors))
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
                isConfig: true
            };

            fetch(requestPath, {
                method: 'POST',
                headers: API_HEADERS,
                body: JSON.stringify(userData)
            })
                .then(result => result.json())
                .then(response => {
                    this.props.history.push('/', {username: userData.username});
                })
                .catch(errors => console.log(errors))
        }

    };

    loadSecondFactor = (username) => {
        const requestPath = config.host + config.apiName + 'auth/get/config/second/' + username;

        fetch(requestPath, {
            method: 'GET',
            headers: API_HEADERS
        })
            .then(response => response.json())
            .then(response => {
                const secret = response.data.twoFactorSecret;

                QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {

                    this.setState({
                        username: {
                            value: response.data.username,
                            error: false,
                            errorMsg: ''
                        },
                        title: 'Config Second Factor',
                        secretQRcodePath: dataUrl,
                        firstFactor: false
                    })

                });

            })
            .catch(errors => console.log(errors));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form method={'POST'} name={'register'} onSubmit={this.handleSubmit}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent >
                                    <Typography variant={'display1'} gutterBottom>
                                        {this.state.title}
                                    </Typography>
                                    {this.state.firstFactor ? (
                                        <FormRegister
                                            username={this.state.username}
                                            password={this.state.password}
                                            showPassword={this.state.showPassword}
                                            confirmPassword={this.state.confirmPassword}
                                            handleChange={this.handleChange}
                                            handleMouseDownPassword={this.handleMouseDownPassword}
                                            handleClickShowPassword={this.handleClickShowPassword}
                                        />
                                    ) : (
                                        <div>
                                            <Typography className={classes.verticalMargin} variant='body2' gutterBottom>
                                                To complete your registration you need to:
                                            </Typography>
                                            <ol>
                                                <li>
                                                    <Typography className={classes.verticalMargin} variant='body2' gutterBottom>
                                                        Open Google Authenticator application on your phone and scan this QRCode
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <Typography className={classes.verticalMargin} variant='body2' gutterBottom>
                                                        Then generate and type a pin on the below field
                                                    </Typography>
                                                </li>
                                            </ol>
                                            <hr/>
                                            <FormSecondFactor
                                                username={this.state.username}
                                                secretQRcodePath={this.state.secretQRcodePath}
                                                token={this.state.token}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                                <CardActions className={classes.actions}>

                                    {this.state.firstFactor ? (
                                        <Grid container justify={'flex-end'} alignItems={'center'}>
                                            <Grid item xs={8}>
                                                <Button component={Link} to='/'>
                                                    <Typography className={classes.actionLink} variant="caption" gutterBottom>
                                                        Login
                                                    </Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button type={'submit'} color={'primary'} variant={'raised'}>
                                                    Send
                                                    <SendIcon className={classes.rightIcon}>send</SendIcon>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container justify={'flex-end'} alignItems={'center'}>
                                            <Grid item xs={8}>
                                                <Typography variant={'caption'} gutterBottom>
                                                    Scan this QRCode
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button type={'submit'} color={'primary'} variant={'raised'}>
                                                    Send
                                                    <SendIcon className={classes.rightIcon}>send</SendIcon>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ) }
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Register);

