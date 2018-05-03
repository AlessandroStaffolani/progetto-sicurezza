import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {withStyles} from "material-ui/styles/index";
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import SendIcon from '@material-ui/icons/Send';

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
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form method={'POST'} name={'login'}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent >
                                    <Typography variant={'display2'} gutterBottom>
                                        Login
                                    </Typography>
                                    <div>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="username">Usename</InputLabel>
                                            <Input
                                                id={'username'}
                                                type={'text'}
                                                value={this.state.username}
                                                onChange={this.handleChange('name')}
                                            />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                            <Input
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
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
                                        </FormControl>
                                    </div>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                    <Grid container justify={'flex-end'}>
                                        <Grid item>
                                            <Button color={'primary'} variant={'raised'}>
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

