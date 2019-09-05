import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, StatusBar, BackHandler } from 'react-native';
import { Text } from 'src/components/text'
import SocketContext from 'src/SocketContext'
import Icon from 'react-native-vector-icons/Feather';

class Manutencao extends Component {
  handleBackButton() {
    this.props.socket.disconnect();
    BackHandler.exitApp();
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton());
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton());
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('src/assets/images/manutencao_background.jpg')} style={{ flex: 1 }}>

          <StatusBar
            backgroundColor={'transparent'}
            translucent
          />

          <View style={styles.container}>
            <Icon
              name="alert-triangle"
              size={80}
              color="#FFF"
            />
            <Text bold={true} style={[styles.text, styles.title]}>Manutenção</Text>
            <Text style={[styles.text, styles.subtitle]}>{this.props.navigation.getParam('message')}</Text>
          </View>

        </ImageBackground>

      </View>
    );
  }
}

const ManutencaoithSocket = props => (
  <SocketContext.Consumer>
      {socket => <Manutencao {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default ManutencaoithSocket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 153, 52, 0.8)'
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20
  }
});