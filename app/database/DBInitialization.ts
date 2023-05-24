// Third Party Library
import SQLLite from 'react-native-sqlite-storage';

export class DBInitialization {

    /*
    * Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
    * This should be called each time the database is opened.
    * */
    public updateDatabaseTables(database : SQLLite.SQLiteDatabase) : Promise<void>{
        let dbVersion: number = 0;
        return database
            .transaction(DBInitialization.createInitialTables)
            .then(() => {
                return this.getDatabaseVersion(database);
            }).then((version) => {
                dbVersion = version;
                return;
            }).then(() => {
                return;
            })
    }

    /*
    * Perform Initial SetUp of the database tables
    * */
    private static createInitialTables(transaction : SQLLite.Transaction) {

        // For Dev Only
        const dropAllTables = false;
        if (dropAllTables){
            transaction.executeSql("DROP TABLE IF EXISTS Feed;");
        }

        // Feed Table
        transaction.executeSql(`CREATE TABLE IF NOT EXISTS Feed(
            feed_id INTEGER PRIMARY KEY NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lat INT,
            lng INT,
            city TEXT,
            country TEXT,
            image_path TEXT NOT NULL,
            temperature INT,
            thought TEXT
        );`);

        // Version Table
        transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
    }

    // Get the version of the database, as specified in the Version table
    private getDatabaseVersion(database: SQLLite.SQLiteDatabase): Promise<number> {
        // Select the highest version number from the version table
        return database
            .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
            .then(([results]) => {
                if (results.rows && results.rows.length > 0) {
                    return results.rows.item(0).version;
                } else {
                    return 0;
                }
            })
            .catch((error) => {
                console.log(`No version set. Returning 0. Details: ${error}`);
                return 0;
            });
    }
}
