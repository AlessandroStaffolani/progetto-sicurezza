import React from 'react';
import Container from '../components/Container';
import Login from '../components/Login';

const Home = (props) => {
    return (
        <Container {...props}>
            <Login/>
        </Container>
    )
};

export default Home;