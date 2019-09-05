import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Login, Boletim, Manutencao, RobotLoading } from './screens';

const MainNavigator = createStackNavigator({
    Login: { screen: Login },
    RobotLoading: { screen: RobotLoading },
    Boletim: { screen: Boletim },
    Manutencao: { screen: Manutencao },
}, {
        headerMode: "none"
    });

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;