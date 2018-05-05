import React from 'react';
import Container from '../components/Container';
import Login from '../components/Login';
import Snackbar from 'material-ui/Snackbar';

class Home extends React.Component {

    render(){
        const { handleClose } = this.props;
        const { state } = this.props.location;
        let showForbidden = this.props.showForbidden;
        let fromPath = '';
        let isRegistered = false;
        if (state !== undefined) {
            showForbidden = state.forbidden;
            if (state.from !== undefined) {
                fromPath = state.from.pathname;
            }
            if (state.username !== undefined) {
                isRegistered = true;
            }
        }
        return (
            <Container {...this.props}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    className={'margin-bottom'}
                    open={showForbidden}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'forbidden-message',
                    }}
                    message={<span id="forbidden-message">The page <code>{fromPath}</code> is protected, please log in</span>}
                />
                <Login isRegistered={isRegistered} username={isRegistered ? state.username : ''}/>
            </Container>
        )
    };
}

export default Home;