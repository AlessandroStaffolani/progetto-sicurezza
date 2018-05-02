import React from 'react';
import Typography from 'material-ui/Typography';

const NoMatch = ({ location }) => {

    return (
        <div>
            <Typography variant={'display2'}>
                Page not found
            </Typography>
            <Typography variant={'headline'}>
                Error: 404
            </Typography>
            <Typography variant={'body2'}>
                No match for
            </Typography>
        </div>
    )
};

export default NoMatch;