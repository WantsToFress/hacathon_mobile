import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight} from 'ramda';

const RootReducer = createReducer(initState, {
    [actions.setData]: (state, action) => {
        return mergeRight(state, action.payload)
    },
    [actions.postRegister.toString() + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {auth: {token: action.payload.token}})
    },
    [actions.postRegister.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
    [actions.postLogin.toString() + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {auth: {token: action.payload.token}})
    },
    [actions.postLogin.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
});

export default RootReducer
