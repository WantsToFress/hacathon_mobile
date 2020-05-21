import {createReducer} from "@reduxjs/toolkit";
import * as actions from './actions'
import initState from '../constants/initState'
import {mergeRight} from 'ramda';

const RootReducer = createReducer(initState, {
    [actions.setData]: (state, action) => {
        return mergeRight(state, action.payload)
    },
});

export default RootReducer
