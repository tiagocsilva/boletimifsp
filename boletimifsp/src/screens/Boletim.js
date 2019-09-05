import CONFIG from 'src/config';
import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator, Animated, BackHandler } from 'react-native';
import { TopBar, NaoHaDisciplinas, DisciplinasViewPager } from 'src/components/boletim'
import { SeletorDisciplina, ToggleSeletorDisciplina } from 'src/components/boletim/seletorDisciplina'
import { SeletorSemestre } from 'src/components/boletim/semestre'
import SocketContext from 'src/SocketContext'

class Boletim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            menuX: new Animated.Value(-100),
            toggleX: new Animated.Value(0),
            currentPage: 0,
            nomeUsuario: this.props.navigation.getParam('nomeUsuario'),
            semestres: this.props.navigation.getParam('semestres'),
            boletim: this.props.navigation.getParam('boletim')
        }
    }
    startEvents() {
        this.props.socket.on("semestres", (semestres) => this.handleSemestres(semestres));
        this.props.socket.on("disciplina", (disciplina) => this.handleDisciplina(disciplina));
        this.props.socket.on("boletim", (boletim) => this.handleBoletim(boletim));
    }
    stopEvents() {
        this.props.socket.removeAllListeners("semestres");
        this.props.socket.removeAllListeners("disciplina");
        this.props.socket.removeAllListeners("boletim");
    }
    componentDidMount() {
        this.startEvents();
        BackHandler.addEventListener('hardwareBackPress', () => this.sair());
    }
    componentWillUnmount() {
        this.stopEvents();
        BackHandler.removeEventListener('hardwareBackPress', () => this.sair());
    }
    sair() {
        this.props.socket.emit("logout");
        this.props.navigation.navigate("Login");

        // Return para prevenir a função de back padrão...
        return true;
    }
    handleSemestres(semestres) {
        this.setState({
            semestres: semestres
        });
    }
    handleBoletim(boletim) {
        this.setState({
            boletim: boletim
        });
    }
    handleDisciplina(disciplina) {
        const boletim = this.state.boletim;

        if (!boletim)
            return;

        boletim.disciplinas.find(x => x.id === disciplina.id).notas = disciplina.notas;
        this.setState({
            boletim: boletim
        })
    }
    trocarSemestre(semestre) {
        this.setState({
            boletim: null,
            currentPage: 0
        });
        this.props.socket.emit('buscarSemestre', semestre, this.props.navigation.getParam('credentials'))
    }
    onPageSelected = e => {
        this.setState({ currentPage: e.nativeEvent.position });
    }
    renderLoading() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        )
    }
    toggleListaDisciplinas() {
        Animated.timing(
            this.state.menuX,
            {
                toValue: this.state.showMenu ? -100 : 0,
                duration: 200
            }
        ).start();

        Animated.timing(
            this.state.toggleX,
            {
                toValue: this.state.showMenu ? 0 : 100,
                duration: 200
            }
        ).start();

        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    selecionarDisciplina(index) {
        this.toggleListaDisciplinas();
        this.disciplinasViewPager.setPage(index);
        this.setState({
            currentPage: index
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={CONFIG.COLORS.BACKGROUND}
                    translucent={false}
                    animated
                />

                <TopBar nomeUsuario={this.state.nomeUsuario} onSairTouch={() => this.sair()} />

                {
                    this.state.boletim ? (
                        this.state.boletim.disciplinas.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <SeletorDisciplina
                                    onSelect={(i) => this.selecionarDisciplina(i)}
                                    selectedIndex={this.state.currentPage}
                                    style={{ left: this.state.menuX }}
                                    disciplinas={this.state.boletim.disciplinas} />

                                <ToggleSeletorDisciplina
                                    showMenu={this.state.showMenu}
                                    toggleX={this.state.toggleX}
                                    onPress={() => this.toggleListaDisciplinas()} />
                                    
                                <DisciplinasViewPager
                                    disciplinas={this.state.boletim.disciplinas}
                                    onPageSelected={this.onPageSelected}
                                    currentPage={this.state.currentPage}
                                    ref={ref => {
                                        this.disciplinasViewPager = ref;
                                    }} />
                            </View> : <NaoHaDisciplinas />) : this.renderLoading()
                }

                {
                    this.state.boletim ?
                        <SeletorSemestre
                            selecionado={this.state.semestres.find(x => x.id === this.state.boletim.semestre)}
                            semestres={this.state.semestres}
                            onSelect={(semestre) => this.trocarSemestre(semestre)} /> : null
                }

            </View>
        );
    }
}

const BoletimWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Boletim {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default BoletimWithSocket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3BA25B'
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
    }
});