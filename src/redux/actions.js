import {createAction} from "redux-actions";
import {register, login, getI, getEquipment as equip, incidentEquipment, incidentCreate, incidents} from '../lib/API'

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

export const sendIncidentEquipment = createAction('post/equipment', (title, description, deadline, priority, id) => {
    return incidentEquipment({
        incident: {
            description: title,
            deadline: new Date(),
            priority: priority,
            comment: description
        },
        equipment_id: id,
        deadline: deadline
    })
});

export const sendIncident = createAction('post/incident', (title, description, deadline, priority) => {
    return incidentCreate({
        description: title,
        deadline: new Date(),
        priority: priority,
        comment: description
    })
});

export const getIncidents = createAction('get/incidents', (args) => {
    return incidents(args)
});
