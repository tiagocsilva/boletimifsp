import React, { Component } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';

export default class Footer extends Component {
    render() {
        return (
            <Animated.View onLayout={(e) => this.props.onLayout(e)} style={[{ flex: this.props.keyboard ? 0 : 1, height: this.props.height }, styles.view]}>
                <Image style={styles.image} source={require("src/assets/images/logo_ifsp_horizontal.jpg")} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width: '70%',
        marginBottom: 20,
        resizeMode: 'contain'
    }
});