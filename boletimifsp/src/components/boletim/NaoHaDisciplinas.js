import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components/text';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class NaoHaDisciplinas extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="robot"
                    size={80}
                    color="#FFF"
                    style={styles.icon}
                />
                <Text bold={true} style={styles.text}>Não há disciplinas no semestre selecionado</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        opacity: 0.6
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20
    },
    icon: {
        marginBottom: 20
    }
});
