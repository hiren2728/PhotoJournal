import React from "react";
import {
    StyleSheet,
    Dimensions,
    Animated,
    ActivityIndicator
} from 'react-native';
import Color from "../utility/Color";

interface Props {
    visible : boolean
}

const Loader = (props : Props) => {
    if (!props.visible){
        return null;
    }

    return (
        <Animated.View style={Style.container}>
            <ActivityIndicator color={Color.white}
                               size={"large"}
                               animating={true}/>
        </Animated.View>
    )
};

const Style = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex : 1000
    }
});

export default Loader;
