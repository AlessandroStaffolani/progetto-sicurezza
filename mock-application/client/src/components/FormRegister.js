import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    }
});

const FormRegister = (props) => {
    const { classes, username, password, confirmPassword, showPassword, handleChange } = props;
    return (
        <div>
            <div>
                <FormControl className={classes.textField} error={username.error}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id={'username'}
                        type={'text'}
                        value={username.value}
                        onChange={handleChange('username')}
                    />
                    <FormHelperText>{username.errorMsg}</FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.textField} error={password.error}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password.value}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={props.handleClickShowPassword}
                                    onMouseDown={props.handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{password.errorMsg}</FormHelperText>
                </FormControl>
                <FormControl className={classes.textField} error={confirmPassword.error}>
                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                    <Input
                        id="confirm-password"
                        type={'password'}
                        value={confirmPassword.value}
                        onChange={handleChange('confirmPassword')}
                    />
                    <FormHelperText>{confirmPassword.errorMsg}</FormHelperText>
                </FormControl>
            </div>
        </div>
    )
};

FormRegister.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormRegister);