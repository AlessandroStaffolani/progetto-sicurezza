import React from 'react';
import Container from '../components/Container';
import RegisterForm from '../components/Register';

const Register = ({ props, location, history }) => {
    return (
        <Container {...props} location={location} history={history}>
            <RegisterForm/>
        </Container>
    )
};

export default Register;