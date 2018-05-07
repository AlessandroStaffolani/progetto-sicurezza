import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

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
    qrCode: {
        width: '300px'
    }
});

const FormSecondFactor = (props) => {
    const { classes, username, token, secretQRcodePath, handleChange } = props;
    return (
        <div>
            <div>
                <FormControl className={classes.textField}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id={'username'}
                        type={'text'}
                        value={username.value}
                        disabled={true}
                    />
                </FormControl>
            </div>
            {secretQRcodePath ? (
                <div style={{ textAlign: 'center' }}>
                    <img className={classes.qrCode} src={secretQRcodePath} alt="Secret"/>
                </div>
            ) : ''}
            <div>
                <FormControl className={classes.textField} error={token.error}>
                    <InputLabel htmlFor="token">One time Token</InputLabel>
                    <Input
                        id={'token'}
                        type={'text'}
                        value={token.value}
                        onChange={handleChange('token')}
                    />
                    <FormHelperText>{token.errorMsg}</FormHelperText>
                </FormControl>
            </div>
        </div>
    )
};

FormSecondFactor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormSecondFactor);