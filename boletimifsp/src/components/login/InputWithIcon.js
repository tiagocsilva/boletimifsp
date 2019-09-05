import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class InputWithIcon extends Component {
    focus() {
        this.input.focus();
    }
    render() {
        return (
            <View style={styles.inputContainer}>
                <Icon
                    name={this.props.icon}
                    size={20}
                    color="#019934"
                />

                <TextInput
                    ref={(input) => this.input = input}
                    {...this.props}
                    placeholderTextColor="rgba(1, 153, 52, 0.8)"
                    autoCapitalize='none'
                    style={styles.input}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'red',
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 8,
        width: '85%'
    },
    input: {
        width: '90%',
        color: "#019934"
    }
});
