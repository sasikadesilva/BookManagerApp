import React, { Component } from 'react';
import { Text, View, StatusBar, Platform, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';


import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store/store';
import { PersistGate } from 'redux-persist/es/integration/react'
import MainRoutes from '../route/MainRoutes'


import Login from './auth/Login'


export default class App extends React.Component{


    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column' }}>

            <StatusBar translucent backgroundColor={'transparent'} barStyle="dark-content" />
            <Provider store={store}>
              <PersistGate
                loading={null}
                persistor={persistor}
              >
               <MainRoutes />
    
              </PersistGate>
    
    
            </Provider>
            
            
    
          </View>
        )
    }
}