// Third Party
import axios from "axios";
import {WeatherInfo} from "../types/WeatherInfo";

const WeatherAPIKey : string = "6842b7c7a2f5395d4c941ef2c517e884";

const OpenWeatherBaseURL : string = "https://api.openweathermap.org/data/2.5/weather";

export const getGeocodeLocationWeatherInfo = (lat : number,lng : number) : Promise<WeatherInfo> => {
    return new Promise(async (resolve,reject) => {
        try{
            let res = await axios.get(OpenWeatherBaseURL,{
                params:{
                    lat : lat,
                    lon : lng,
                    appid : WeatherAPIKey,
                    units : 'metric'
                }
            });
            let responseData = res.data;
            let main = responseData.main ?? {};
            resolve({
                temperature : main.temp ?? 0
            })
        }
        catch (e) {
            if (__DEV__)
                console.log("Error ::",e.response);
            console.log('"Error in request ::',e.request);
            reject(e)
        }
    })
};
