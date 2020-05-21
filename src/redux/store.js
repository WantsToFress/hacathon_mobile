import {persistReducer, persistStore} from 'redux-persist'
import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import AsyncStorage from '@react-native-community/async-storage'
import initState from '../constants/initState'

import RootReducer from './reducer';

const middleware = [thunk, promise];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initState
});

export const persistor = persistStore(store);
