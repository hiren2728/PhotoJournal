// Third Party Library
import SQLite, {ResultSet} from 'react-native-sqlite-storage';

import {DBInitialization} from './DBInitialization';
import {DATABASE} from './Constants';
import {Feed} from "../types/Feed";

export interface Database {
    createFeed(data: Feed): Promise<number>;
    updateFeed(data: Feed): Promise<void>;

    // Read Operation
    getAllFeeds(): Promise<Feed[]>;
    getHottestDayFeed() : Promise<Feed | null>;
    getCoolestDayFeed() : Promise<Feed | null>;
    getFeedById(id? : number) : Promise<Feed>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

/*
* Insert a new feed into database
* */
async function createFeed(data: Feed): Promise<number> {
    return getDatabase()
        .then((db) => db.executeSql("INSERT INTO Feed (lat,lng,city,country,image_path,temperature,thought) VALUES (?,?,?,?,?,?,?);",
            [data.lat, data.lng, data.city, data.country, data.image_path, data.temperature, data.thought]))
        .then(([results]) => {
            return Promise.resolve(results.insertId)
        })
}

/*
* Update feed info database
* */
async function updateFeed(data: Feed): Promise<void> {
    return getDatabase()
        .then((db) => db.executeSql("UPDATE Feed SET lat = ?, lng = ?, city = ?, country = ?, image_path = ?, temperature = ?, thought = ?, created_at = ? WHERE feed_id = ?;", [
            data.lat,
            data.lng,
            data.city,
            data.country,
            data.image_path,
            data.temperature,
            data.thought,
            data.created_at,
            data.feed_id
        ]))
        .then(([results]) => {
            return Promise.resolve()
        })
}

// ----- Read Operations -----
// Fetch all feeds and sort by Desc Order
async function getAllFeeds(): Promise<Feed[]> {
    return getDatabase()
        .then((db) => db.executeSql('SELECT * FROM Feed ORDER BY created_at DESC;'))
        .then(([results]) => {
            if (results === undefined)
                return [];
            return buildFeedArrayFromRow(results)
        })
}

// Get the Feed Details by Id
async function getFeedById(id? : number) : Promise<Feed> {
    return getDatabase()
        .then((db) => db.executeSql('SELECT * FROM Feed WHERE feed_id = ?;',[id]))
        .then(([results]) => {
            let feedRows = buildFeedArrayFromRow(results);
            return Promise.resolve(feedRows[0])
        })
}

/*
* Find the Hottest days by checking temperature from saved Feeds
* */
async function getHottestDayFeed(): Promise<Feed | null> {
    return getDatabase().then((db) => db.executeSql('SELECT MAX(temperature),temperature,created_at FROM Feed ORDER BY created_at ASC;'))
        .then(([result]) => {
            if (result === undefined)
                return null;

            let feeds = buildFeedArrayFromRow(result);
            if (feeds.length > 0)
                return feeds[0];
            return null
        }).catch(e => {
            console.log("error ::",e);
            return Promise.reject(e)
        })
}

/*
* Find the Coolest days by checking temperature from saved Feeds
* */
async function getCoolestDayFeed() : Promise<Feed | null> {
    return getDatabase().then((db) => db.executeSql('SELECT MIN(temperature),temperature,created_at FROM Feed ORDER BY created_at ASC;'))
        .then(([result]) => {
            if (result === undefined)
                return null;

            let feeds = buildFeedArrayFromRow(result);
            if (feeds.length > 0)
                return feeds[0];
            return null
        }).catch(e => {
            console.log("error ::",e);
            return Promise.reject(e)
        })
}
/*
* Private Helper Methods
* */
function buildFeedArrayFromRow(result : ResultSet) : Feed[] {
    const count = result.rows.length;
    const feeds: Feed[] = [];
    for (let i = 0; i < count; i++) {
        feeds.push(result.rows.item(i))
    }
    return feeds
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (databaseInstance !== undefined) {
        return Promise.resolve(databaseInstance)
    }
    return openDB();
}

// Open database function
async function openDB(): Promise<SQLite.SQLiteDatabase> {
    SQLite.DEBUG(__DEV__);
    SQLite.enablePromise(true);

    if (databaseInstance) {
        // Database is already open
        return databaseInstance;
    }

    const db = await SQLite.openDatabase({
        name: DATABASE.FILE_NAME,
        location: 'default'
    });

    // Perform any database initialization or updates, if needed
    const databaseInitialization = new DBInitialization();
    await databaseInitialization.updateDatabaseTables(db);

    databaseInstance = db;
    return db;
}

export const sqliteDB: Database = {
    createFeed,
    updateFeed,
    getAllFeeds,
    getHottestDayFeed,
    getCoolestDayFeed,
    getFeedById
};
