import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, AppState } from 'react-native';
import { HighButton, InputWithIcon } from "./";
import SocketContext from 'src/SocketContext'
import DropdownAlert from 'react-native-dropdownalert';

let timeoutLoading = null;

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prontuario: "",
            senha: "",
            loading: false,
            showErrorMessage: false,
            componentTop: 0
        }

        this.props.socket.on("login", (status) => this.handleLogin(status));
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        //Impedir que o loading do robo apareça em um momento erro, após voltar o app do background

        if (
            timeoutLoading &&
            nextAppState.match(/inactive|background/)
        )
            clearTimeout(timeoutLoading);
    };

    login() {
        Keyboard.dismiss();
        this.hideErrorMessage();

        this.setState({
            loading: true
        });

        this.props.socket.emit("login", {
            prontuario: this.state.prontuario,
            senha: this.state.senha
        });

        timeoutLoading = setTimeout(() => {
            this.props.navigation.navigate("RobotLoading");
        }, 3500);
    }
    handleLogin(status) {
        status.success ? this.loginSuccess(status) : this.loginError(status.erro);

        this.setState({
            loading: false
        });
    }
    loginSuccess(status) {
        this.props.onLoginSuccess(status);

        this.setState({
            prontuario: "",
            senha: ""
        });
    }
    loginError(msg) {
        if (timeoutLoading)
            clearInterval(timeoutLoading);

        this.props.navigation.navigate("Login");
        this.setState({
            showErrorMessage: true
        })
        this.dropdownalert.alertWithType('error', 'Atenção', msg);
    }
    hideErrorMessage() {
        this.setState({
            showErrorMessage: false
        });
    }
    onLayout() {
        this.container.measure((x, y, width, height, pageX, pageY) => {
            this.setState({
                componentTop: pageY
            })
        });
    }
    render() {
        return (
            <View ref={ref => this.container = ref} style={styles.container} onLayout={() => this.onLayout()}>

                {
                    this.state.showErrorMessage ?

                        <DropdownAlert ref={ref => this.dropdownalert = ref}
                            closeInterval={9999}
                            translucent={true}
                            wrapperStyle={{ top: -(this.state.componentTop) }}
                            inactiveStatusBarBackgroundColor="transparent" />
                        : null
                }

                <InputWithIcon
                    icon="account-outline"
                    placeholder="Prontuário"
                    value={this.state.prontuario}
                    onChangeText={(val) => { this.setState({ prontuario: val, showErrorMessage: false }) }}
                    onFocus={() => this.hideErrorMessage()}
                    onSubmitEditing={() => this.inputSenha.focus()}
                />

                <InputWithIcon
                    ref={(input) => this.inputSenha = input}
                    icon="lock-outline"
                    placeholder="Senha"
                    value={this.state.senha}
                    secureTextEntry={true}
                    onChangeText={(val) => this.setState({ senha: val, showErrorMessage: false })}
                    onFocus={() => this.hideErrorMessage()}
                    onSubmitEditing={() => this.login()}
                />

                <HighButton style={{ width: '100%' }} title="Entrar" loading={this.state.loading} onPress={() => this.login()} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

const FormWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Form {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default FormWithSocket;