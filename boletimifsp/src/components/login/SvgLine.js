import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Svg, Polygon } from 'react-native-svg'

export default class SvgLine extends Component {
    render() {
        return (
            <Svg
                preserveAspectRatio="none" viewBox="0 0 100 100"
                style={[{ height: this.props.keyboard ? 0 : 40 }, styles.svg]}
            >
                <Polygon points="100,100 100,0 0,100" fill="#FFF"></Polygon>
            </Svg>
        );
    }
}

const styles = StyleSheet.create({
    svg: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0
    }
});