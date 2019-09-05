import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, StatusBar, Keyboard, Animated } from 'react-native';
import { AppTitle, SvgLine, Form, Footer } from 'src/components/login'
import SocketContext from 'src/SocketContext'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginResult: null,
      keyboard: false,
      footerHeight: new Animated.Value(0)
    }

    this.props.socket.on("manutencao", (msg) => this.handleManutencao(msg));

    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _handleSemestres = (semestres) => this.setLoginResultState('semestres', semestres);
  _handleBoletim = (boletim) => this.goToBoletim(boletim);

  _keyboardDidShow = () => {
    this.setState({
      keyboard: true
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboard: false
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  startBoletimEvents() {
    this.props.socket.on("semestres", this._handleSemestres);
    this.props.socket.on("boletim", this._handleBoletim);
  }
  stopBoletimEvents() {
    this.props.socket.removeListener("semestres", this._handleSemestres);
    this.props.socket.removeListener("boletim", this._handleBoletim);
  }
  setLoginResultState(key, value) {
    const loginResult = this.state.loginResult;
    loginResult[key] = value;
    this.setState({
      loginResult: loginResult
    })
  }
  goToBoletim(boletim) {
    this.setLoginResultState('boletim', boletim);
    this.props.navigation.navigate("Boletim", this.state.loginResult);
    this.stopBoletimEvents();
    this.setState({
      loginResult: null
    });
  }
  handleManutencao(msg) {
    this.props.navigation.navigate("Manutencao", { message: msg });
  }

  onLoginSuccess(status) {
    this.setState({
      loginResult: status
    });
    this.startBoletimEvents();
  }

  onFooterLayout(event) {
    if (this.state.footerHeight._value == 0) {
      this.setState({
        footerHeight: new Animated.Value(event.nativeEvent.layout.height)
      })
    }
    Animated.timing(this.state.footerHeight, {
      toValue: 0,
      duration: 80
    }).start();
  }

  render() {
    return (
      <ImageBackground source={require('src/assets/images/login_background.jpg')} style={{ flex: 1 }}>
        <View style={styles.colorLayer}>
          <View style={styles.contentContainer}>

            <StatusBar
              backgroundColor={'transparent'}
              translucent
            />

            <View style={styles.container}>
              <AppTitle />
              <Form onLoginSuccess={(s) => this.onLoginSuccess(s)} navigation={this.props.navigation} />
            </View>

            <SvgLine keyboard={this.state.keyboard} />
            
          </View>

          <Footer keyboard={this.state.keyboard} height={this.state.footerHeight} onLayout={(e) => this.onFooterLayout(e)} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  colorLayer: {
    flex: 1,
    backgroundColor: 'rgba(1, 153, 52, 0.7)'
  },
  contentContainer: { 
    flex: 4,
    position: 'relative' 
  }
});

const LoginWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Login {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default LoginWithSocket;