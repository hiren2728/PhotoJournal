// Third Party
import axios from "axios";

// Utility
import {LocationGeocode} from "../types/LocationGeocode";

const OpenStreetBaseURL : string = "https://nominatim.openstreetmap.org/reverse.php?";

export const reverseGeocodeRequest = async (lat : number,lng : number) : Promise<LocationGeocode> => {
    return new Promise(async (resolve,reject) => {
        try{
            let res = await axios({
                method : 'get',
                url : OpenStreetBaseURL + `format=jsonv2&lat=${lat}&lon=${lng}`
            });
            let responseData = res.data;
            let address = responseData.address ?? {};
            resolve({
                city : address.city ?? address.state_district,  // When user location is from village area then will not city in response so in that case, showing district of that location
                country : address.country,
                lat : lat,
                lng : lng
            });
        }
        catch (e) {
            if (__DEV__)
                console.log('error ::',e.response);
            let data = e.response.data ?? {};
            if (data.hasOwnProperty('error') && typeof data.error === "object"){
                reject(new Error(data.error.message))
            }
            else if (data.hasOwnProperty('error') && typeof data.error === "string"){
                reject(new Error(data.error))
            }
            else
                reject(e)
        }
    });
};
