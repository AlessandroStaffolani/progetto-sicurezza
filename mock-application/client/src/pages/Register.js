import React from 'react';
import Container from '../components/Container';
import RegisterForm from '../components/Register';

const Register = ({ props, location }) => {
    return (
        <Container {...props} location={location}>
            <RegisterForm/>
        </Container>
    )
};

export default Register;