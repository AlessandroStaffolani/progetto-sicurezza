import React, {Component} from 'react';
import '../components-styles/App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from './AppBar';
import Login from './Login';
import Grid from 'material-ui/Grid';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#90CAF9',
            main: '#2196F3',
            dark: '#1565C0',
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

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar title={'2 Factor Authentication'} them={theme}/>
                <Grid container justify={'center'} spacing={0}>
                    <Grid item xs={12} sm={10} md={10}>
                        <Login theme={theme}/>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

export default App;
