import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#90CAF9',
            main: '#2196F3',
            dark: '#1976D2',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FF8A80',
            main: '#FF1744',
            dark: '#D50000',
            contrastText: '#fff',
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
