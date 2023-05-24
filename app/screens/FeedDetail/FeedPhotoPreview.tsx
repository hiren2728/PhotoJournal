import React from "react";
import {
    ImageBackground,
} from 'react-native';

// Third Party
import {StackNavigationProp} from "@react-navigation/stack";

// Component
import CommonBackground from "../../component/CommonBackground";

// Utility
import CommonStyle from "../../utility/CommonStyle";
import {getFeedImageFullPath} from "../../helper/FileManager";


interface Props {
    navigation : StackNavigationProp<any,any>,
    route : any
}

/*
* Show the Preview of Capture photo for Saved feed
* */
const FeedPhotoPreview = (props : Props) => {
    const {route} = props;
    const photoURL = route.params.photoURL;

    return(
        <CommonBackground>
            <ImageBackground source={{uri : getFeedImageFullPath(photoURL)}}
                             resizeMode={"contain"}
                             style={CommonStyle.FlexOne}/>
        </CommonBackground>
    )
};


export default FeedPhotoPreview;
