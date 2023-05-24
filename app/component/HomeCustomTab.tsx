import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    GestureResponderEvent
} from 'react-native';

// Third Party Library
import DeviceInfo, {isTablet} from 'react-native-device-info';

// Components


// Utility
import {isPortrait} from "../utility/Scale";
import Color from "../utility/Color";

interface Props {
    jumpTo: (arg0: string) => void;
    navigationState : {index : number};
    onPlusClick: ((event: GestureResponderEvent) => void) | undefined;
}

const HomeCustomTab = (props: Props) => {

    const renderTabItem = (icon: string, key: string) => {
        return (
            <TouchableOpacity style={Style.TabItemView} onPress={() => props.jumpTo(key)}>
                <Image source={{uri: icon}} style={[Style.TabItemIcon,isPortrait() ? PortraitOnlyStyle.TabItemIcon : LandscapeOnlyStyle.TabItemIcon]}/>
            </TouchableOpacity>
        )
    };

    const renderPlusButton = () => {
        return (
            <TouchableOpacity style={Style.PlusButtonView} onPress={props.onPlusClick}>
                <Image source={{uri: "ic_tab_plus"}} style={[Style.PlusIcon,isPortrait() ? PortraitOnlyStyle.PlusIcon : LandscapeOnlyStyle.PlusIcon]}/>
            </TouchableOpacity>
        )
    };

    return (
        <View style={[Style.Container,isPortrait() ? PortraitOnlyStyle.Container : LandscapeOnlyStyle.Container]}>
            {renderTabItem( props.navigationState.index === 0 ? 'ic_tab_home_selected' : 'ic_tab_home', 'feedList')}
            {renderPlusButton()}
            {renderTabItem( props.navigationState.index === 1 ? 'ic_tab_summary_selected' : 'ic_tab_summary', 'summary')}
        </View>
    )
};

const TabHeightPortraitScale = Platform.select({
    ios: isTablet() ? 7 :  DeviceInfo.hasNotch() ? 8 : 10,
    android: isTablet() ? 8 : 10
});

const TabHeightLandscapeScale = Platform.select({
    ios: isTablet() ? 10 : DeviceInfo.hasNotch() ? 16 : 20,
    android: isTablet() ? 14 : 20
});

const Style = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.white,
        borderTopWidth: 1,
        borderTopColor: Color.tab_border_gray,
    },
    TabItemView: {
        flex: 0.33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TabItemIcon: {
        aspectRatio: 1,
    },
    PlusButtonView: {
        flex: 0.33,
        justifyContent: 'center',
        alignItems: 'center',
        height : '100%'
    },
    PlusIcon: {
        aspectRatio: 1,
    }
});

const PortraitOnlyStyle = StyleSheet.create({
    Container:{
        height : `${TabHeightPortraitScale}%`
    },
    TabItemIcon: {
        height : '30%'
    },
    PlusIcon:{
        height: isTablet() ? '110%' : `120%`,
        marginBottom: `${isTablet() ? '25%' : '50%'}`
    }
});

const LandscapeOnlyStyle = StyleSheet.create({
    Container:{
        height : `${TabHeightLandscapeScale}%`
    },
    TabItemIcon: {
        height : '40%'
    },
    PlusIcon:{
        height: isTablet() ? '110%' : `125%`,
        marginBottom: '20%'
    }
});

export default HomeCustomTab;
