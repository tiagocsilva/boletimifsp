import React, { Component } from 'react';
import { YellowBox } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './AppContainer';
import SocketContext from './SocketContext';
import SocketIOClient from 'socket.io-client';
import CONFIG from 'src/config';

const socket = SocketIOClient(CONFIG.SOCKET_URL);

export default class App extends Component {
    constructor(props) {
        super(props);

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
            'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground.'
        ]);

        socket.connect();
    }
    componentDidMount() {
        SplashScreen.hide()
    }
    render() {
        return (
            <SocketContext.Provider value={socket}>
                <AppContainer />
            </SocketContext.Provider>
        );
    }
}