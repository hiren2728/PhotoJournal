import {useEffect, useState} from "react";

import {Feed} from "../types/Feed";
import {useDatabase} from "../context/DBContext";

// Hooks for Fetch the All data like hottest day, coolest day and total recorded feed from db
export function useSummary() {

    const database = useDatabase();
    const [hottestDayFeed,setHottestDayFeed] = useState<Feed | null>(null);
    const [coolestDayFeed,setCoolestDayFeed] = useState<Feed | null>(null);

    useEffect(() => {
        loadSummaryData();
    },[]);

    function loadSummaryData() {
        database.getHottestDayFeed().then(setHottestDayFeed);
        database.getCoolestDayFeed().then(setCoolestDayFeed);
    }

    function refreshData() {
        loadSummaryData()
    }

    return {
        hottestDayFeed,
        coolestDayFeed,
        refreshData
    }
}
