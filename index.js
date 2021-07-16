/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import Routes from './src/routes/index'
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store/store'

const App = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    </Provider>        
)

AppRegistry.registerComponent(appName, () => App);
