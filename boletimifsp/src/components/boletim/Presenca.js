import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components/text';

export default class Presenca extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text bold={true} style={[styles.text, styles.percentual]}>
                    {this.props.percentual}
                </Text>

                <Text style={[styles.text, styles.faltas]}>
                    ({this.props.faltas} {this.props.faltas == 1 ? "Falta" : "Faltas"})
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 105,
        height: 105,
        borderRadius: 60,
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    text: {
        color: '#3CBC64'
    },
    percentual: {
        fontSize: 25
    },
    faltas: {
        fontSize: 14
    }
});
