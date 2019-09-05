import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ListaSemestreItem } from 'src/components/boletim/semestre'

export default class ListaSemestre extends Component {
    render() {
        return (
            <Animated.ScrollView style={[styles.container, this.props.style]}>
                {
                    this.props.semestres.map(x => <ListaSemestreItem selected={x.id === this.props.selecionadoId} onPress={this.props.onSelect} semestre={x} key={x.id} />)
                }
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: CONFIG.COLORS.BACKGROUND,
        width: '100%',
        zIndex: 2
    }
})
