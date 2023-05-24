import React, {FunctionComponent} from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";

// Third Party
import moment from "moment";

// Custom Component
import CommonGradientView from "../../../component/CommonGradientView";
import TextLabel from "../../../component/TextLabel";

// Utility
import {Feed} from "../../../types/Feed";
import Color from "../../../utility/Color";
import {horizontalScale, isPortrait, verticalScale} from "../../../utility/Scale";
import {getFeedImageFullPath} from "../../../helper/FileManager";
import {formatTemperature, isTodayFeedCreated} from "../../../utility";
import Routes from "../../../navigation/Routes";
import * as GlobalNavigationRef from '../../../navigation/GlobalNavigationRef';
import {useFeeds} from "../../../hooks/useFeeds";
import {isTablet} from "react-native-device-info";

type FeedListItemProps = {
    data: Feed,
    fromDetail? : boolean
}

const defaultProps = {
    fromDetail : false
};

/*
* Display the single feed info on List and Feed Detail view component
* */
export const FeedListItem: FunctionComponent<FeedListItemProps> = (props : FeedListItemProps) => {

    const {data,fromDetail} = props;
    const {todayFeed} = useFeeds();

    const onFeedClick = () => {
        if (fromDetail){
            GlobalNavigationRef.navigate(Routes.FeedPhotoPreview,{
                photoURL : data.image_path
            })
        }
        else{
            GlobalNavigationRef.navigate(Routes.FeedDetail,{
                feed_id : data.feed_id
            });
        }
    };

    const onEditPhotoClick = () => {
        GlobalNavigationRef.navigate(Routes.CapturePhoto,{
            forEdit : true
        })
    };

    const renderEditPhotoButton = () => {
        if (fromDetail && todayFeed && isTodayFeedCreated(data)){
            return (
                <TouchableOpacity style={Style.EditPhotoButton}
                                  onPress={onEditPhotoClick}>
                    <Image source={{uri : 'ic_capture_photo'}}
                           style={Style.CaptureIcon}/>
                </TouchableOpacity>
            )
        }
        return null
    };

    return (
        <TouchableOpacity activeOpacity={0.9}
                          style={Style.MainContainer}
                          onPress={onFeedClick}>
            <ImageBackground style={[Style.Container,isPortrait() ? PortraitOnlyStyle.Container : LandscapeOnlyStyle.Container]}
                             source={{uri: getFeedImageFullPath(data.image_path)}}>
                {/* Feed date */}
                <TextLabel color={Color.white}
                           bold
                           mh={12}
                           mt={8}
                           fontSize={14}>
                    {`${moment.utc(data.created_at).local().format("MMM")}\n`}
                    <TextLabel bold
                               fontSize={24}
                               color={Color.white}>
                        {moment.utc(data.created_at).local().format("DD")}
                    </TextLabel>
                </TextLabel>

                {/* Bottom Info View */}
                <CommonGradientView style={Style.BottomInfoView}>
                    {/* Location */}
                    <View style={Style.LocationInfoView}>
                        {/* Location Info */}
                        <Image source={{uri: "ic_location"}}
                               resizeMode={"contain"}
                               style={Style.LocationIcon}/>
                        <TextLabel color={Color.white}
                                   regular
                                   ml={6}
                                   singleLine={false}
                                   numberOfLine={2}
                                   style={{flex: 1}}
                                   fontSize={14}>
                            {`${data.city},${data.country}`}
                        </TextLabel>

                        {/* Temperature Info */}
                        <TextLabel color={Color.white}
                                   bold
                                   ml={8}
                                   mr={6}
                                   singleLine
                                   fontSize={14}>
                            {formatTemperature(data.temperature)}
                        </TextLabel>
                        <Image source={{uri: "ic_temperature"}}
                               style={Style.TemperatureIcon}/>
                    </View>
                </CommonGradientView>
            </ImageBackground>
            {renderEditPhotoButton()}
        </TouchableOpacity>
    )
};

FeedListItem.defaultProps = defaultProps;

const LandscapeOnlyStyle = StyleSheet.create({
    Container:{
        width : '60%'
    },
});

const PortraitOnlyStyle = StyleSheet.create({
    Container:{
        width : '100%'
    },
});

const Style = StyleSheet.create({
    MainContainer:{
        width : '100%',
        alignItems: 'center'
    },
    Container: {
        aspectRatio: 2.04,
        justifyContent: 'space-between'
    },
    BottomInfoView: {
        width: '100%',
        paddingHorizontal: horizontalScale(12),
        paddingVertical: verticalScale(8)
    },
    LocationInfoView: {
        flexDirection: 'row',
        alignItems : 'center'
    },
    LocationIcon: {
        aspectRatio : 0.831,
        width : horizontalScale(14)
    },
    TemperatureIcon: {
        width: horizontalScale(15),
        aspectRatio: 1
    },
    EditPhotoButton:{
        position : 'absolute',
        bottom : -horizontalScale(isTablet() ? 25 : 20),
        justifyContent: 'center',
        alignItems : 'center',
        width : horizontalScale(isTablet() ? 46 : 56),
        aspectRatio : 1,
        alignSelf : 'center',
        zIndex : 1000
    },
    CaptureIcon:{
        width : '100%',
        aspectRatio : 1
    }
});
