import React from 'react';
import Container from '../components/Container';
import NoMatch from '../components/NoMatch';

const NotFound = ({ props, location, history }) => {
    return (
        <Container {...props} location={location} history={history}>
            <NoMatch/>
        </Container>
    )
};

export default NotFound;