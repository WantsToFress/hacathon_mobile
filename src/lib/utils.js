import {drop, path} from "ramda";

export const undefinedObject = (stringPath, object, defaultResult = undefined) => {
    return path(stringPath.split('.').join('[').split('[').join(']').split(']').filter(e => !!e), object) || defaultResult
};
