import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight} from 'ramda';

const RootReducer = createReducer(initState, {
    //nav
    [actions.goForward]: (state, action) => {
        return mergeRight(state, { history: action.payload })
    },
});

export default RootReducer
