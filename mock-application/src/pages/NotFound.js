import React from 'react';
import Container from '../components/Container';
import NoMatch from '../components/NoMatch';

const NotFound = (props) => {

    return (
        <Container {...props}>
            <NoMatch/>
        </Container>
    )
};

export default NotFound;