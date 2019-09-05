import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { Text } from 'src/components/text'

export default class ListaSemestreItem extends Component {
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.onPress(this.props.semestre.id)}>
                <View style={styles.item}>
                    <View style={{ position: 'absolute', left: 65 }}>
                        {
                            this.props.selected ?
                                <Icon
                                    name="checkcircle"
                                    size={18}
                                    color="#FFF"
                                    style={{ marginLeft: 'auto' }}
                                /> : null
                        }
                    </View>
                    <View>
                        <Text style={styles.itemText}>{this.props.semestre.nome}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#0cb754',
        borderBottomWidth: 1,
        padding: 15
    },
    itemText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center'
    }
});
