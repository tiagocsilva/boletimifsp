import React, { Component } from 'react';
import { Text, Animated } from 'react-native';

export default class GoogleSansText extends Component {
    render() {
        const fontFamily = this.props.bold ? 'GoogleSans-Bold' : 'Google-Sans';
        const style = [{ fontFamily: fontFamily }, this.props.style];

        return (
            this.props.animated ?
                <Animated.Text style={style}>{this.props.children}</Animated.Text>
                : <Text style={style}>{this.props.children}</Text>
        );
    }
}