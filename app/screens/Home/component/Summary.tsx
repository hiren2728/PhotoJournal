import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

// Third Party
import moment from "moment";
import {StackNavigationProp} from "@react-navigation/stack";

// Component
import TextLabel from "../../../component/TextLabel";
import CommonBackground from "../../../component/CommonBackground";

// Utility
import {horizontalScale, verticalScale} from "../../../utility/Scale";
import Strings from "../../../utility/string";
import Color from "../../../utility/Color";
import DateFormats from "../../../utility/DateFormats";
import {formatTemperature, isTodayFeedCreated} from "../../../utility";

// Hooks
import {useSummary} from "../../../hooks/useSummary";
import {useFeeds} from "../../../hooks/useFeeds";

interface Props {
    navigation : StackNavigationProp<any,any>,
}

const Summary = (props : Props) => {

    const {feeds,refreshFeeds} = useFeeds();
    const {hottestDayFeed,coolestDayFeed,refreshData} = useSummary();

    React.useEffect(() => {
        return props.navigation.addListener('focus',() => {
            refreshData();
            refreshFeeds().then(() => {})
        });
    },[props.navigation]);

    useEffect(() => {
        setTotalRecordedDays(feeds.length);
        if (feeds.length > 0){
            let firstDayRecordObj = feeds[feeds.length - 1];
            if (isTodayFeedCreated(firstDayRecordObj)){
                setTotalDays(1)
            }
            else{
                let sinceFirstDayCount = moment().utc(false).diff(moment(firstDayRecordObj.created_at).format('YYYY-MM-DD'),'days') + 1;
                setTotalDays(sinceFirstDayCount)
            }
        }
        else
            setTotalDays(0);
    },[feeds]);

    const [totalDays,setTotalDays] = useState<number>(0);
    const [totalRecordedDays,setTotalRecordedDays] = useState<number>(0);

    const renderSingleInfoSection = (title : string, mainData : string, bottomCaption : string) => {
        return(
            <View style={Style.InfoSectionContainer}>
                {/* Title */}
                <TextLabel color={Color.gray}
                           bold
                           fontSize={20}>
                    {title}
                </TextLabel>

                {/* Main Data */}
                <TextLabel color={Color.gray_dark}
                           bold
                           mt={8}
                           fontSize={50}>
                    {mainData}
                </TextLabel>

                {/* Bottom Caption */}
                <TextLabel color={Color.gray}
                           regular
                           mt={8}
                           fontSize={14}>
                    {bottomCaption}
                </TextLabel>

            </View>
        )
    };

    return (
        <CommonBackground>
            <ScrollView style={Style.Scroll}
                        contentContainerStyle={Style.ScrollContainer}>
                {renderSingleInfoSection(Strings.daysCaption,`${totalRecordedDays}/${totalDays}`,Strings.recordedCountCaption.replace("{count}",String(totalRecordedDays)).replace("{day}",totalRecordedDays > 1 ? Strings.days : Strings.day))}
                {feeds.length > 0 && hottestDayFeed && renderSingleInfoSection(Strings.hottestDayCaption,formatTemperature(hottestDayFeed.temperature),moment.utc(hottestDayFeed.created_at).local().format(DateFormats.FEED_DATE))}
                {feeds.length > 0 && coolestDayFeed && renderSingleInfoSection(Strings.coldestDayCaption,formatTemperature(coolestDayFeed.temperature),moment.utc(coolestDayFeed.created_at).local().format(DateFormats.FEED_DATE))}
            </ScrollView>
        </CommonBackground>
    );
};

const Style = StyleSheet.create({
    Scroll:{
        marginBottom: verticalScale(40),
        flex : 1,
    },
    ScrollContainer:{
        justifyContent : 'center',
        paddingHorizontal : horizontalScale(12),
        marginBottom : verticalScale(50)
    },
    InfoSectionContainer:{
        justifyContent: 'center',
        alignItems : 'center',
        paddingVertical : verticalScale(16),
        borderBottomColor : Color.light_gray,
        borderBottomWidth : 1
    }
});

export default Summary
