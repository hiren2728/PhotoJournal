import React from "react";
import {Image, StyleSheet, View} from "react-native";

// Third Party Library
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Home from "../screens/Home";
import CapturePhoto from '../screens/CapturePhoto';
import FeedDetail from "../screens/FeedDetail";
import FeedPhotoPreview from "../screens/FeedDetail/FeedPhotoPreview";
import Splash from "../screens/Splash";

// Constant
import Routes from "./Routes";
import NavigationHeaderLogo from "../component/NavigationHeaderLogo";
import {horizontalScale} from "../utility/Scale";
import {isTablet} from "react-native-device-info";

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitle: props => <NavigationHeaderLogo {...props}/>,
            headerTitleAlign : 'center',
            headerBackTitleVisible: false,
            headerBackImage: (props => <View style={Style.BackImageContainer}>
                <Image source={{uri: 'ic_back_left'}}
                       style={Style.BackImage}/>
            </View>)
        }}>
            <Stack.Screen name={Routes.Splash}
                          options={{
                              headerShown: false
                          }}
                          component={Splash}/>

            <Stack.Screen name={Routes.Home}
                          component={Home}/>

            <Stack.Screen name={Routes.CapturePhoto}
                          component={CapturePhoto}/>

            <Stack.Screen name={Routes.FeedDetail}
                          component={FeedDetail}/>

            <Stack.Screen name={Routes.FeedPhotoPreview}
                          component={FeedPhotoPreview}/>

        </Stack.Navigator>
    )
};

const Style = StyleSheet.create({
    BackImageContainer: {
        width: horizontalScale(isTablet() ? 24 : 36),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackImage: {
        width: '90%',
        aspectRatio: 1
    }
});

export default RootNavigation;
