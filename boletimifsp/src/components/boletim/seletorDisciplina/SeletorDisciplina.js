import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableNativeFeedback } from 'react-native';
import { Text } from 'src/components/text';

export default class SeletorDisciplina extends Component {
    render() {
        return (
            <Animated.ScrollView style={[this.props.style, styles.container]}>
                {
                    this.props.disciplinas.map((disciplina, i) => {
                        return (
                            <TouchableNativeFeedback key={i} onPress={() => this.props.onSelect(i)}>
                                <View style={[styles.item, this.props.selectedIndex == i ? { backgroundColor: '#FFF' } : null]}>
                                    <Text style={{ color: this.props.selectedIndex == i ? 'green' : '#FFF' }}>{disciplina.sigla}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })
                }
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRightWidth: 0,
        borderRightColor: '#008A2A',
        opacity: 1,
        width: 100,
        height: '100%',
        backgroundColor: CONFIG.COLORS.BACKGROUND,
        borderColor: '#0cb754',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        position: 'absolute',
        zIndex: 1,
    },
    item: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0cb754',
    }
});
