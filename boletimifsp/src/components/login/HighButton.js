import React, { Component } from 'react';
import { Text } from 'src/components/text';
import { StyleSheet, View, TouchableNativeFeedback, ActivityIndicator } from 'react-native';

export default class HighButton extends Component {
    render() {
        return (
            <TouchableNativeFeedback disabled={this.props.loading} onPress={this.props.onPress}>
                <View style={styles.button}>
                    {
                        this.props.loading ? <ActivityIndicator size="small" color="#1fa54c" />
                            : <Text bold={true} style={styles.buttonText}>{this.props.title}</Text>
                    }
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 14,
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '85%',
        minHeight: 46 // MinHeight para impedir que o tamanho mude ao iniciar o loading
    },
    buttonText: {
        color: '#1fa54c',
        fontSize: 14
    }
});
