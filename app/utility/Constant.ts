import {Platform} from 'react-native';
export const locationConfig = Platform.select({
    ios : {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 0,
    },
    android:{
        enableHighAccuracy: __DEV__, //TODO change to false on build for android only, for iOS set it true always
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 0,
    }
})
