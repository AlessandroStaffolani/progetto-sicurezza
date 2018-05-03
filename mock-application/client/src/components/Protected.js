import React from 'react';
import Typography from 'material-ui/Typography';

class Protected extends React.Component {

    render() {
        return (
            <div>
                <Typography variant="display2" gutterBottom>
                    Protected area
                </Typography>
            </div>
            )
    }
}

export default Protected;