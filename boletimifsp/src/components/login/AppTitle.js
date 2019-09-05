import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AppTitle extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Boletim IFSP</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 45,
        color: '#FFF',
        width: '100%',
        textAlign: 'center',
    }
});
