import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles/index";
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import SendIcon from '@material-ui/icons/Send';
import config from '../config';
import FormLogin from './FormLogin';
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

    render() {
        const { classes, isRegistered } = this.props;

        return (
            <div>
                <form method={'POST'} name={'login'} onSubmit={this.props.handleSubmit}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent >
                                    <Typography variant={'display1'} gutterBottom>
                                        Login
                                    </Typography>
                                    {isRegistered ? (
                                        <Typography className={classes.successMessage} variant={'subheading'} gutterBottom>
                                            New user succefully created! Please log in
                                        </Typography>
                                    ) : ''}

                                    {this.props.firstFactor ?
                                        <FormLogin
                                            username={this.props.username}
                                            password={this.props.password}
                                            showPassword={this.props.showPassword}
                                            handleChange={this.props.handleChange}
                                            handleMouseDownPassword={this.props.handleMouseDownPassword}
                                            handleClickShowPassword={this.props.handleClickShowPassword}
                                        />
                                        : (
                                            <div>
                                                <Typography className={classes.verticalMargin} variant='body2' gutterBottom>
                                                    To complete your login you need to open Google Authenticator application and type your one time token
                                                </Typography>
                                                <hr/>
                                                <FormSecondFactor
                                                    username={this.props.username}
                                                    secretQRcodePath={false}
                                                    token={this.props.token}
                                                    handleChange={this.props.handleChange}
                                                />
                                            </div>
                                        )
                                    }
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

