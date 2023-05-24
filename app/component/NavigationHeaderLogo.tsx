import React from "react";
import {
    Image
} from 'react-native';

// Utility
import {horizontalPercentageScale, isLandscape} from "../utility/Scale";
import {isTablet} from "react-native-device-info";

const NavigationHeaderLogo = (props : object) => {

    const style = isLandscape() ? {
        width : horizontalPercentageScale( isTablet() ? 12 : 10),
        aspectRatio : 3.85,
    } : {
        width : horizontalPercentageScale( isTablet() ? 14 : 25),
        aspectRatio : 3.85,
    };

    return(
        <Image source={{uri : 'ic_header_logo'}}
               resizeMode={'contain'}
               style={style}/>
    )
};

export default NavigationHeaderLogo;
