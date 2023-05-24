// Third Party Library
import GeoCoder from 'react-native-geocoder-reborn';
import Geolocation, {GeolocationResponse} from "@react-native-community/geolocation";
import {locationConfig} from "../utility/Constant";

interface GeoAddress {
    city : string,
    country : string
}

/*
* Fetch the user's current location and return it asynchronously
* */
export const fetchCurrentLocation = () : Promise<GeolocationResponse> => {
    return new Promise((resolve,reject) => {
        Geolocation.getCurrentPosition((position) => {
            resolve(position)
        },error => {
            reject(error)
        },locationConfig)
    });
};

/*
* Reverse geocode location and return address of it using native classes of android and ios
* */
export const fetchAddressFrom = (lat : number,lng : number) : Promise<GeoAddress> => {
    return new Promise((resolve,reject) => {
        GeoCoder.geocodePosition({
            lat,lng
        }).then(res => {
            if (res && res.length > 0){
                let placeResult = res[0];
                let city = placeResult.locality;

                if (city === "") {
                    city = placeResult.subAdminArea;
                }

                resolve({
                    city : city ?? "",
                    country : placeResult.country
                })
            }
            else{
                reject(new Error("To continue, turn on device location."))
            }
        }).catch(error => reject(error))
    })
}
