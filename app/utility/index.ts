import {
    Alert
} from 'react-native';

// Third Party
import moment from "moment";

// Utility
import Strings from "./string";
import {Feed} from "../types/Feed";

/*
* Format the Number value to temperature for display. Value will be round to nearest max number
* */
export const formatTemperature = (value: number): string => {
    return `${Math.round(value)}˚`
};

/*
* For validate Feed's create date is today or not.
* */
export const isTodayFeedCreated = (feed: Feed | null): boolean => {
    if (feed === null)
        return false;
    const todayDateMoment = moment();
    const createdAtMoment = moment(feed.created_at).utc(true);
    return todayDateMoment.isSame(createdAtMoment, 'days')
};

/*
* For Display message only alert without any action of button
* */
export const showAlert = (message: string): void => {
    if (message && message !== "")
        Alert.alert(Strings.appName, message, [
            {
                text: Strings.okButton, onPress: () => {}
            }
        ], {
            cancelable: false
        })
};
