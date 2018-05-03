import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

const styles = {
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
};

function AppBar (props) {
    const { classes, pages, title } = props;
    return (
        <div className={classes.root}>
            <MaterialAppBar position="static" color="primary">
                <Toolbar>
                    {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>*/}
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                    {pages.map(page => (
                        <Button key={page.id} color={'inherit'} component={Link} to={page.path}>
                            {page.label}
                        </Button>
                    ))}
                </Toolbar>
            </MaterialAppBar>
        </div>
    );
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);