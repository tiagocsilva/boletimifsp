import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components/text';
import { Presenca, NotaContainer } from './';

export default class Disciplina extends Component {
    render() {
        const detalhes = this.props.detalhes;

        return (
            <View style={styles.container}>
                <Presenca percentual={detalhes.frequencia} faltas={detalhes.faltas} />
                <Text bold={true} style={styles.nome}>{detalhes.nome}</Text>
                <NotaContainer notas={detalhes.notas} media={detalhes.media} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    nome: {
        color: '#FFF',
        padding: 10,
        paddingBottom: 18,
        fontSize: 16,
        textAlign: 'center'
    }
});
