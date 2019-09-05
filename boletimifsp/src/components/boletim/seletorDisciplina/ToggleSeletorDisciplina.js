import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Dimensions from 'Dimensions';

export default class ToggleSeletorDisciplina extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
                <Animated.View style={[styles.button, { left: this.props.toggleX }]}>
                    <Icon
                        name={this.props.showMenu ? 'chevron-left' : 'chevron-right'}
                        size={20}
                        color="#FFF"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderTopRightRadius: 40,
        paddingRight: 5,
        borderBottomRightRadius: 40,
        height: 60,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: CONFIG.COLORS.BACKGROUND,
        zIndex: 1,
        top: Dimensions.get('window').height / 2 - StatusBar.currentHeight - 60
    }
});
