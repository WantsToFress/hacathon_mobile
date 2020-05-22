import {createAction} from "redux-actions";
import {register, login} from '../lib/API'

export const setData = createAction('set/data', data => data);

export const postRegister = createAction('post/reg', (login, full_name, password, email) => {
    return register(login, full_name, password, email)
});

export const postLogin = createAction('post/login', (_login, password) => {
    return login(_login, password)
});
