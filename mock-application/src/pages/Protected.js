import React from 'react';
import Container from '../components/Container';
import ProtectedComponent from '../components/Protected';

const Protected = (props) => {
    return (
        <Container {...props}>
            <ProtectedComponent/>
        </Container>
    )
};

export default Protected;