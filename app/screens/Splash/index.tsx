import React, {useEffect} from "react";
import {
    View,
    Image,
    StyleSheet, Platform
} from 'react-native';

// Third Party Library
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from "@react-navigation/stack";

// Utility
import Color from "../../utility/Color";
import Routes from "../../navigation/Routes";

interface Props {
    navigation : StackNavigationProp<any,any>
}

/*
* Custom Launch Screen for hide native splash screen and process any operation if required on app launch
* */
const Splash = (props : Props) => {

    useEffect(() => {
        SplashScreen.hide();
        setTimeout(() => {
            props.navigation.reset({
                routes : [{name : Routes.Home}]
            })
        },2000)
    },[]);

    return(
        <View style={Style.Container}>
            <Image source={{uri : 'ic_header_logo'}}
                   resizeMode={'contain'}
                   style={Platform.OS === "ios" ? Style.LogoIOS : Style.LogoAndroid}/>
        </View>
    )
};

const Style = StyleSheet.create({
    Container:{
        flex : 1,
        backgroundColor : Color.white,
        justifyContent : 'center',
        alignItems : 'center'
    },
    LogoIOS:{
        width : '35%',
        aspectRatio : 3.85,
    },
    LogoAndroid:{
        width : 180,
        height: 47
    }
});

export default Splash;
