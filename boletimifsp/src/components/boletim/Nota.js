import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components/text'

export default class Nota extends Component {
    render() {
        const notaFinalClass = this.props.isNotaFinal ? styles.notaFinal : null;
        const skeletonClass = this.props.skeleton ? styles.skeleton : null;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[styles.text, notaFinalClass, skeletonClass]}>{this.props.descricao}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.text, styles.nota, notaFinalClass]}>{this.props.nota}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 50
    },
    skeleton: {
        backgroundColor: '#3CBC64',
        width: '80%',
        padding: 2,
        borderRadius: 6
    },
    text: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 3,
    },
    nota: {
        width: 70,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#3CBC64',
        borderRadius: 6
    },
    notaFinal: {
        alignSelf: 'center',
        backgroundColor: '#FFF',
        color: '#3CBC64',
        padding: 5,
        borderRadius: 6
    }
});
