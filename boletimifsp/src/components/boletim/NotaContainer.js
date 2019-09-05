import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Nota } from 'src/components/boletim'

export default class NotaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skeletonOpacity: new Animated.Value(1)
        }
    }
    componentWillMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.skeletonOpacity, {
                    toValue: 0.5,
                    duration: 400
                }),
                Animated.timing(this.state.skeletonOpacity, {
                    toValue: 1,
                    duration: 400
                })
            ])
        ).start();
    }
    renderNotas(notas) {
        return (
            <View style={styles.container}>
                <View style={styles.notasContainer}>
                    {
                        notas.map((x, i) => <Nota key={i} descricao={x.descricao} nota={x.nota} />)
                    }
                </View>
                <Nota descricao="Média Final" nota={this.props.media} isNotaFinal={true} skeleton={false} />
            </View>
        );
    }

    renderSkeleton() {
        return (
            <Animated.View style={[styles.container, { opacity: this.state.skeletonOpacity }]}>
                <View style={styles.notasContainer}>
                    <Nota skeleton={true} />
                    <Nota skeleton={true} />
                    <Nota skeleton={true} />
                </View>
                <Nota skeleton={true} />
            </Animated.View>
        );
    }

    render() {
        return this.props.notas ? this.renderNotas(this.props.notas) : this.renderSkeleton();
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
    },
    notasContainer: {
        paddingBottom: 15,
    }
});
