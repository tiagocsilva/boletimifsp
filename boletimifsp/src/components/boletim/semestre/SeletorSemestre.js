import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { ListaSemestre, IndicadorSemestre } from './index'

export default class SeletorSemestre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorShow: false,
            bottomSpace: 0,
            listaHeight: 300,
            listaY: new Animated.Value(-300)
        }
    }
    toggleLista() {
        Animated.timing(
            this.state.listaY,
            {
                toValue: this.state.selectorShow ? -(this.state.listaHeight) : this.state.bottomSpace,
                duration: 300
            }
        ).start();

        this.setState({
            selectorShow: !this.state.selectorShow
        })
    }
    setBottomSpace(event) {
        this.setState({
            bottomSpace: event.nativeEvent.layout.height
        })
    }
    render() {
        return (
            <View>
                <IndicadorSemestre
                    semestreSelecionado={this.props.selecionado}
                    onLayout={(e) => this.setBottomSpace(e)}
                    selectorShow={this.state.selectorShow}
                    onPress={() => this.toggleLista()} />

                <ListaSemestre
                    selecionadoId={this.props.selecionado.id}
                    onSelect={(semestre) => { this.props.onSelect(semestre); this.toggleLista() }}
                    semestres={this.props.semestres}
                    style={{ bottom: this.state.listaY, height: this.state.listaHeight }} />
            </View>
        );
    }
}