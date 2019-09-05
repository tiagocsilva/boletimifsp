import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text } from 'src/components/text'

export default class TopBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Olá {this.props.nomeUsuario.split(' ')[0]}</Text>
                <TouchableNativeFeedback onPress={this.props.onSairTouch}>
                    <View style={styles.row}>
                        <Icon
                            name="logout"
                            size={10}
                            color="#FFF"
                            style={{marginRight: 5}}
                        />
                        <Text style={styles.text}>Sair</Text>
                    </View>
                </TouchableNativeFeedback>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: CONFIG.COLORS.BACKGROUND,
        padding: 16
    },
    text: {
        color: '#FFF',
        fontSize: 15
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
