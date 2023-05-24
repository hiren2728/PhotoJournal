import React, { useContext, useState } from "react";

// Utility
import {Database,sqliteDB} from '../database/Database';
import {Feed} from "../types/Feed";

/*
* Initialize DB Context
* */
const DBContext = React.createContext<Database | undefined>(undefined);

const FeedsContext = React.createContext<Feed[] | undefined>(undefined);
type SetFeeds = (feeds : Feed[]) => void;
const SetFeedsContext = React.createContext<SetFeeds | undefined>(undefined);

export const FeedContextProvider : React.FunctionComponent = function ({children}) {
    const [feeds,setFeeds] = useState<Feed[]>([]);

    return(
        <DBContext.Provider value={sqliteDB}>
            <FeedsContext.Provider value={feeds}>
                <SetFeedsContext.Provider value={setFeeds}>{children}</SetFeedsContext.Provider>
            </FeedsContext.Provider>
        </DBContext.Provider>
    )
};

export function useDatabase() : Database {
    const database = useContext(DBContext);
    if (database === undefined){
        throw new Error('useDatabase must be used within a FeedContextProvider')
    }
    return database;
}

export function useFeedsContext() : Feed[] {
    const feedsContext = useContext(FeedsContext);
    if (feedsContext === undefined){
        throw new Error("useFeedContext must be used within a FeedContextProvider")
    }
    return feedsContext;
}

export function useSetFeedsContext() : SetFeeds {
    const feedUpdateContext = useContext(SetFeedsContext);
    if (feedUpdateContext === undefined){
        throw new Error("useSetListsContext must be used within a ListContextProvider");
    }
    return feedUpdateContext;
}
