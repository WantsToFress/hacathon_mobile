import AsyncStorage from '@react-native-community/async-storage';
import {store} from "../../redux/store";
import {fromPairs} from "ramda";
import {API_URL} from '../../constants/globals'
import {undefinedObject} from "../utils";
import {setData} from "../../redux/actions";

class Storage {
    static getStateData = (type) => {
        return store.getState()[type] || null
    };
    static setStateData = (type, data) => {
        store.dispatch(setData(fromPairs[[type, data]]))
    };

    static setData = async (type, data) => {
        try {
            await AsyncStorage.setItem(type, data);
        } catch (error) {
            console.warn(error)
        }
    };
    static getData = async (type) => {
        try {
            const value = await AsyncStorage.getItem(type);
            if (value !== null) {
                return value
            }
        } catch (error) {
            console.warn(error)
        }
    };
}

const getHeaders = () => {
    let headers = new Headers();
    let token = Storage.getStateData('auth').token;
    let locale = Storage.getStateData('locale');
    if (!!token) {
        headers.append('X-AUTH-TOKEN', token);
    }
    if (!!locale) {
        headers.append('Accept-Language', locale);
    }
    return headers;
}

const trimSlash = (url) => {
    if (url[url.length - 1] === '/') {
        url = url.slice(0, -1);
    }
    return url;
}

const createUrl = (endpoint, args) => {
    let queryString = '';
    /* Construct the query string */
    if (args && Object.keys(args).length !== 0) {
        const query = [];
        for (let name in args) {
            query.push(`${name}=${encodeURIComponent(args[name])}`);
        }
        queryString = `?${query.join('&')}`;
    }
    /* Trim right slash if needed */
    return `${API_URL}${trimSlash(endpoint)}/${queryString}`;
}

const handleRefresh = async () => {
    let auth = await authorize(undefinedObject('phone', Storage.getStateData('auth')),
                                undefinedObject('user.id', Storage.getStateData('auth')));

    if (auth) {
        await Storage.setStateData('auth', Object.assign(Storage.getStateData('auth'), {token: auth.data.token}))
    }
}

const call = (method, endpoint, args, data, headers=null) => {
    headers = headers ? headers : getHeaders();

    let body = data;
    if ((data !== null && typeof data === 'object' && !data.hasOwnProperty('_parts')) || Array.isArray(data)) {
        body = JSON.stringify({data: data});
    }

    let options = {
        method: method,
        headers: headers,
        body: body
    };

    const url = createUrl(endpoint, args);
    let error;

    return fetch(url, options).then(async response => {
        console.log(method, endpoint, response);
        if (!response.ok) {
            let json = await response.json();
            error = Error(response.status);
            error.status = response.status;
            error.errors = json.errors;
            return new Promise((res, rej) => rej(error));
        }
        return response.json()
    }).catch(async (e) => {
        console.warn(e)
        if ([401].includes(e.status) || [403].includes(e.status)) {
            await handleRefresh(); //set getting token
            let newHeaders = new Headers();
            newHeaders.append('X-AUTH-TOKEN', Storage.getStateData('auth').token);
            newHeaders.append('Accept-Language', Storage.getStateData('locale'));

            options.headers = newHeaders;
            let response = await fetch(url, options);
            if (!response.ok) {
                let json = await response.json();
                error = Error(response.status);
                error.status = response.status;
                error.errors = json.errors;
                return new Promise((res, rej) => rej(error));
            }
            return response.json()
        } else if ([405].includes(e.status)) {
            return new Promise((res, rej) => rej(e));
        } else {
            console.warn(e);
            if (e.hasOwnProperty('errors')) {
                let messages = [];
                let status = '?';
                let type = 'error';

                for (let item of e.errors) {
                    type = item.type;
                    messages.push(item.message)
                }
                console.warn(messages)
            }
            return new Promise((res, rej) => rej(e));
        }
    })
}

export const authorize = (phone, id) => {
    return call('POST', '/v1/auth/refresh_token/', null, {phone: phone, id: id});
}

export const register = (login, full_name, password, email) => {
    return call('POST', '/register/', null, {login, full_name, password, email});
}

export const getEquipment = () => {

}

export const getI = () => {
    call('GET', '/i/', null, null).then(res => alert(JSON.stringify(res)))
}
