import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, BackHandler, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { Text } from 'src/components/text'
import { AnimatedSVGPath } from 'react-native-svg-animations';
import robot from '../assets/robot'

export default class RobotLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSpinner: false,
      opacityFirst: new Animated.Value(0),
      opacitySecond: new Animated.Value(0),
      opacityThird: new Animated.Value(0)
    }
  }
  componentWillUnmount() {
    // Ativar botão de voltar novamente
    BackHandler.removeEventListener('hardwareBackPress', () => true);
  }
  componentDidMount() {
    // Desativar botão de voltar
    BackHandler.addEventListener('hardwareBackPress', () => true);

    Animated.sequence([
      Animated.delay(4500),
      Animated.timing(this.state.opacityFirst, {
        toValue: 1,
        duration: 800
      }),
      Animated.timing(this.state.opacitySecond, {
        toValue: 1,
        duration: 800
      }),
      Animated.timing(this.state.opacityThird, {
        toValue: 1,
        duration: 800
      }),
    ]).start(() => {
      this.setState({
        showSpinner: true
      })
    });
  }
  renderAnimatedText(txt, opacityProp) {
    return <Text bold={true} animated={true} style={[styles.text, { opacity: opacityProp }]}>{txt}</Text>
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={CONFIG.COLORS.BACKGROUND}
          translucent={false}
          animated
        />

        <View style={{ flexDirection: 'row' }}>
          {this.renderAnimatedText("ROBY ", this.state.opacityFirst)}
          {this.renderAnimatedText("ESTÁ ", this.state.opacitySecond)}
          {this.renderAnimatedText("TRABALHANDO", this.state.opacityThird)}
        </View>

        <AnimatedSVGPath
          strokeColor={"#FFF"}
          duration={30000}
          strokeWidth={3}
          scale={0.75}
          delay={0}
          width={500}
          height={Dimensions.get('window').height * 0.8}
          d={robot}
          loop={false}
        />

        <View style={styles.footer}>
          {
            this.state.showSpinner ?
              <ActivityIndicator size="large" color="#FFF" />
              : null

          }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONFIG.COLORS.BACKGROUND
  },
  text: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20
  },
  footer: {
    height: 50,
    marginTop: 40
  }
});