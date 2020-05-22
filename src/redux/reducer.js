import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight, mergeAll} from 'ramda';

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
    [actions.getProfile.toString() + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {auth: mergeRight(state.auth, action.payload), update: !state.update})
    },
    [actions.getProfile.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
    [actions.getEquipment.toString() + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {equipment: action.payload.equipment})
    },
    [actions.getEquipment.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
    [actions.getIncidents.toString() + '_FULFILLED']: (state, action) => {
        return mergeRight(state, {incidents: action.payload.incidents})
    },
    [actions.getIncidents.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
    [actions.sendIncidentEquipment.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
    [actions.sendIncident.toString() + '_REJECTED']: (state, action) => {
        return mergeRight(state, {error: action.payload})
    },
});

export default RootReducer
