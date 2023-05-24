import {useEffect, useState} from "react";

import {Feed} from "../types/Feed";
import {useDatabase,useFeedsContext,useSetFeedsContext} from "../context/DBContext";
import {isTodayFeedCreated} from "../utility";

/*
* Hooks for fetch the all feeds, perform add/edit operation for feed in db
* */
export function useFeeds() {
    const feeds : Feed[] = useFeedsContext();
    const setFeeds : (feeds : Feed[]) => void = useSetFeedsContext();
    const database = useDatabase();
    const [todayFeed,setTodayFeed] = useState<Feed | null>(null);

    useEffect(() => {
        refreshFeeds().then(r => {})
    }, []);

    useEffect(() => {
        loadAdditionalFeedData();
    },[feeds]);

    const loadAdditionalFeedData = () => {
        if (feeds.length > 0){
            if (isTodayFeedCreated(feeds[0])){
                setTodayFeed(feeds[0])
            }
        }
    };

    function refreshFeeds() {
        return database.getAllFeeds().then(setFeeds)
    }

    function createFeed(data : Feed) : Promise<number> {
        return database.createFeed(data).then((feedID) => {
            refreshFeeds().then(() => {});
            return Promise.resolve(feedID)
        })
    }

    function updateFeed(data : Feed) : Promise<void>{
        return database.updateFeed(data).then(refreshFeeds)
    }

    return {
        feeds,
        createFeed,
        todayFeed,
        updateFeed,
        refreshFeeds
    }
}
