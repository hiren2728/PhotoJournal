import React, {PropsWithChildren} from "react";
import {
    View,
    StyleSheet
} from 'react-native';
import Color from "../utility/Color";

const CommonBackground = (props : PropsWithChildren<any>) => {
    return(
        <View style={Style.Container}>
            {props.children}
        </View>
    )
};

const Style = StyleSheet.create({
    Container:{
        backgroundColor : Color.primary_bg,
        flex : 1
    }
});

export default CommonBackground;
