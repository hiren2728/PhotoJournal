import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';

// Third Party
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

// Component
import CommonBackground from "../../component/CommonBackground";
import {FeedListItem} from "../Home/component/FeedListItem";
import TextInputArea from "../../component/TextInputArea";
import TextLabel from "../../component/TextLabel";

// Hooks
import {useDatabase} from "../../context/DBContext";

// Utility
import {horizontalScale, isPortrait, verticalScale} from "../../utility/Scale";
import {isTodayFeedCreated} from "../../utility";
import Strings from "../../utility/string";
import Color from "../../utility/Color";

// Types
import {Feed} from "../../types/Feed";

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

/*
* Show the Detail of Single Field with Photo and Message
* User can edit message here if visible feed is today's
* */
const FeedDetail = (props: Props) => {

    const {updateFeed,getFeedById} = useDatabase();
    const safeAreaInsets = useSafeAreaInsets();
    const [feedDetail,setFeedDetail] = useState<Feed | null>(null);
    useEffect( () => {
        getFeedData().then(() => {});
    },[]);

    React.useEffect(() => {
        return props.navigation.addListener('focus', () => {
            getFeedData().then(() => {})
        });
    }, [props.navigation]);

    const getFeedData = async () => {
        const {route} = props;
        const feed_id = route.params.feed_id;
        let feedDetail = await getFeedById(feed_id);
        setFeedDetail(feedDetail);
        if (feedDetail)
            setTxtThoughtMsg(feedDetail.thought ?? "")
    };

    const [txtThoughtMsg, setTxtThoughtMsg] = useState<string>( "");
    useEffect(() => {
        let updateFeedObj: Feed = Object.assign({}, feedDetail);
        updateFeedObj.thought = txtThoughtMsg;
        updateFeed(updateFeedObj).then(result => {})
    }, [txtThoughtMsg]);

    let isTodayFeedVisible = isTodayFeedCreated(feedDetail);

    const onThoughtInputChange = (value: string) => {
        setTxtThoughtMsg(value);
    };

    return (
        <CommonBackground>
            <SafeAreaView style={Style.SafeArea}>
                <KeyboardAwareScrollView style={[Style.Container, {marginBottom: safeAreaInsets.bottom}]}
                contentContainerStyle={Style.ScrollContentContainer}>
                    {feedDetail && <FeedListItem data={feedDetail} fromDetail={true}/>}

                    <View style={isPortrait() ? PortraitOnlyStyle.FeedMessageContainer : LandscapeOnlyStyle.FeedMessageContainer}>
                        {
                            !isTodayFeedVisible ?
                                <TextLabel fontSize={16}
                                           mh={16}
                                           mv={20}
                                           color={Color.gray}
                                           numberOfLine={0}
                                           regular>
                                    {feedDetail?.thought ?? ""}
                                </TextLabel>
                                :
                                <TextInputArea placeholder={!isTodayFeedVisible ? "" : Strings.typeThoughtsPlaceholder}
                                               onChangeText={onThoughtInputChange}
                                               editable={isTodayFeedVisible}
                                               value={txtThoughtMsg}
                                               style={Style.TextInput}/>
                        }
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </CommonBackground>
    )
};

const PortraitOnlyStyle = StyleSheet.create({
    FeedMessageContainer : {
        width : '100%'
    }
});

const LandscapeOnlyStyle = StyleSheet.create({
    FeedMessageContainer : {
        width : '60%'
    }
});

const Style = StyleSheet.create({
    TextInput: {
        marginHorizontal: horizontalScale(16),
        marginTop: verticalScale(30),
        marginBottom: verticalScale(30),
        flex: 1
    },
    Container: {
        flex: 1
    },
    ScrollContentContainer:{
        alignItems : 'center'
    },
    SafeArea:{
        flex : 1,
        backgroundColor : 'transparent'
    }
});

export default FeedDetail;
