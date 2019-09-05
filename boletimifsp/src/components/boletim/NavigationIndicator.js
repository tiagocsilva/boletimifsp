import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class NavigtionIndicator extends Component {
    render() {
        const balls = [];
        for (let i = 0; i < this.props.numberOfPages; i++)
            balls.push(<View key={i} style={[styles.ball, i !== this.props.currentPage ? styles.lowOpactity : null]}></View>)

        return (
            <View style={[styles.container, this.props.style]}>
                {balls}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    ball: {
        width: 13,
        height: 13,
        padding: 5,
        marginHorizontal: 3,
        backgroundColor: '#FFF',
        borderRadius: 30
    },
    lowOpactity: {
        opacity: 0.5
    }
});
