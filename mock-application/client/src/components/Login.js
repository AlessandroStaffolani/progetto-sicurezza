import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {Link} from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {withStyles} from "material-ui/styles/index";
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import SendIcon from '@material-ui/icons/Send';
import config from '../config';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        width: '100%',
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
    successMessage: {
        color: '#388E3C',
        backgroundColor: '#C8E6C9',
        border: '1px solid #388E3C',
        padding: '12px 20px',
        borderRadius: '2px'
    }
});

const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: props.username,
                error: false,
                errorMsg: ''
            },
            password:  {
                value: '',
                error: false,
                errorMsg: ''
            },
            showPassword: false,
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

            const requestPath = config.host + config.apiName + 'auth/authenticate/';

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
                    }
                })
                .catch(errors => console.log(errors));
        }
    };

    render() {
        const { classes, isRegistered } = this.props;

        return (
            <div>
                <form method={'POST'} name={'login'} onSubmit={this.handleSubmit}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent >
                                    <Typography variant={'display2'} gutterBottom>
                                        Login
                                    </Typography>
                                    {isRegistered ? (
                                        <Typography className={classes.successMessage} variant={'subheading'} gutterBottom>
                                            New user succefully created! Please log in
                                        </Typography>
                                    ) : ''}
                                    <div>
                                        <FormControl className={classes.textField} error={this.state.username.error}>
                                            <InputLabel htmlFor="username">Usename</InputLabel>
                                            <Input
                                                id={'username'}
                                                type={'text'}
                                                value={this.state.username.value}
                                                onChange={this.handleChange('username')}
                                            />
                                            <FormHelperText>{this.state.username.errorMsg}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl className={classes.textField} error={this.state.password.error}>
                                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password.value}
                                                onChange={this.handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>{this.state.password.errorMsg}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                    <Grid container justify={'flex-end'} alignItems={'center'}>
                                        <Grid item xs={8}>
                                            <Button component={Link} to='/register'>
                                                <Typography className={classes.actionLink} variant="caption" gutterBottom>
                                                    Register
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
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Login);

