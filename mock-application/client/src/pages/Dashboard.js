import React from 'react';
import Container from '../components/Container';
import DashboardComponent from '../components/Dashboard';

const Dashboard = (props) => {
    return (
        <Container {...props}>
            <DashboardComponent/>
        </Container>
    )
};

export default Dashboard;