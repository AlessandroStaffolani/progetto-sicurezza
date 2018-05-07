import React from 'react';
import Typography from 'material-ui/Typography';

const NoMatch = ({ props, location }) => {
    return (
        <div>
            <Typography variant={'display1'}>
                Page not found
            </Typography>
            <Typography variant={'headline'}>
                Error: 404
            </Typography>
            <Typography variant={'body2'}>
                No match for <code>{location.pathname}</code>
            </Typography>
        </div>
    )
};

export default NoMatch;