import CONFIG from 'src/config';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'src/components/text';

export default class IndicadorSemestre extends Component {
    renderSeletor() {
        return (
            <View style={styles.row}>
                <Icon
                    name="close"
                    size={14}
                    color="#FFF"
                    style={styles.icon}
                />
                <Text bold={true} style={{ color: '#FFF' }}>Selecione o Semestre</Text>
            </View>);
    }

    renderIndicador() {
        return (
            <View style={[styles.row, styles.indicador]}>
                <View style={styles.row}>
                    <Icon
                        name="filter"
                        size={14}
                        color="#FFF"
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Semestre</Text>
                </View>
                <Text bold={true} style={styles.text}>{this.props.semestreSelecionado.nome}</Text>
            </View>
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress} onLayout={this.props.onLayout}>
                <View style={[styles.container, this.props.selectorShow ? styles.selector : {}]}>
                    {this.props.selectorShow ? this.renderSeletor() : this.renderIndicador()}
                </View>
            </TouchableWithoutFeedback>)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: CONFIG.COLORS.BACKGROUND,
        padding: 16,
        height: 53
    },
    text: {
        color: '#FFF',
        fontSize: 15
    },
    selector: {
        justifyContent: 'center',
        borderTopColor: '#0cb754',
        borderTopWidth: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicador: {
        flex: 1,
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: 5
    }
});
