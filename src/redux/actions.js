import {createAction} from "redux-actions";
import {register, login, getI, getEquipment as equip} from '../lib/API'

export const setData = createAction('set/data', data => data);

export const postRegister = createAction('post/reg', (login, full_name, password, email) => {
    return register(login, full_name, password, email)
});

export const postLogin = createAction('post/login', (_login, password) => {
    return login(_login, password)
});

export const getProfile = createAction('get/profile', () => {
    return getI()
});

export const getEquipment = createAction('get/equipment', () => {
    return equip()
});
