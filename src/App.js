import React from 'react';
import {persistor, store} from "./redux/store";
import {connect, Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import LoginStack from './screens/LoginStack'
import MainStack from './screens/MainStack'
import LoadingContainer from "./screens/loadingContainer";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from "react-native-safe-area-context";

const Stack = createStackNavigator();

class AppContainer extends React.Component {
    render() {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="LoadingContainer">
                        <Stack.Screen name="LoadingContainer" component={LoadingContainer}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name="LoginStack" component={LoginStack}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name="MainStack" component={MainStack}
                                      options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

console.disableYellowBox = false;

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer/>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
