import React from 'react';
import Container from '../components/Container';
import NoMatch from '../components/NoMatch';

const NotFound = ({ props, location }) => {
    return (
        <Container {...props} location={location}>
            <NoMatch/>
        </Container>
    )
};

export default NotFound;