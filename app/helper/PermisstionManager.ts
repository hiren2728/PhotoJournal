/*
* Handle the All permission related stuff in app
* */

import {Platform} from 'react-native';

// Third Party library
import RNPermissions, { request } from 'react-native-permissions'

const { PERMISSIONS, RESULTS } = RNPermissions;

/*
* Request permission for Location access
* */
export const requestLocationPermission = () : Promise<boolean | Error> => {
    // @ts-ignore
    return request(Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    })).then(result => {
        if (result === RESULTS.GRANTED)
            return Promise.resolve(true);
        else
            return Promise.resolve(false);
    }).catch(error => {
        return Promise.resolve(false);
    });
};

/*
* Request permission for Camera Access
* */
export const requestCameraPermission = () : Promise<boolean | Error> => {
    // @ts-ignore
    return request(Platform.select({
        ios : PERMISSIONS.IOS.CAMERA,
        android : PERMISSIONS.ANDROID.CAMERA
    })).then(result => {
        if (result === RESULTS.GRANTED)
            return Promise.resolve(true);
        else
            return Promise.resolve(false);
    }).catch(error => {
        return Promise.reject(error)
    })
};

