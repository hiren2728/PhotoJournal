import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

// Third Party
import {StackNavigationProp} from "@react-navigation/stack";

// Component
import CommonBackground from "../../../component/CommonBackground";
import {FeedListItem} from "./FeedListItem";
import TextLabel from "../../../component/TextLabel";

// Hooks
import {useFeeds} from "../../../hooks/useFeeds";

// Utility
import {Feed} from '../../../types/Feed'
import Strings from "../../../utility/string";
import CommonStyle from "../../../utility/CommonStyle";
import Color from "../../../utility/Color";
import {horizontalScale} from "../../../utility/Scale";

interface Props {
    navigation: StackNavigationProp<any, any>,
}

/*
* Show the List of Feeds which is saved by user in local db
* */
const FeedList = (props: Props) => {

    const {feeds, refreshFeeds} = useFeeds();

    React.useEffect(() => {
        return props.navigation.addListener('focus', () => {
            refreshFeeds().then(r => {
            })
        });
    }, [props.navigation]);

    const renderFeedListItem = (data: { item: Feed, index: number }) => {
        return (
            <FeedListItem data={data.item}/>
        )
    };

    const renderEmptyView = () => {
        return (
            <View style={Style.EmptyContainer}>
                <TextLabel color={Color.gray}
                           medium
                           fontSize={17}>
                    {Strings.emptyFeedListMsg}
                </TextLabel>
            </View>
        )
    };

    return (
        <CommonBackground>
            <FlatList data={feeds}
                      style={CommonStyle.FlexOne}
                      contentContainerStyle={[feeds.length ? null : {justifyContent: 'center',flex : 1}]}
                      ListEmptyComponent={renderEmptyView}
                      keyExtractor={item => item.feed_id?.toString() ?? "feed_item"}
                      renderItem={renderFeedListItem}/>
        </CommonBackground>
    );
};

const Style = StyleSheet.create({
    EmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal : horizontalScale(20)
    }
});

export default FeedList
