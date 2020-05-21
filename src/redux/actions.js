import {createAction} from "redux-actions";
import {register} from '../lib/API'

export const setData = createAction('set/data', data => data);

export const postRegister = createAction('post/reg', (login, full_name, password, email) => {
    return register(login, full_name, password, email)
});
