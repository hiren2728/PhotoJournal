/*
* For Perform various operation related to local files/ directory etc..
* */
import {Platform} from 'react-native';

// Third Party
import RNFS from 'react-native-fs';

const FeedImageFolder = "feed";

// Move File to Document Directory under Feed Folder
export const moveCapturedPhotoToDocumentDir = async (from : string) : Promise<string> => {
    let feedFolderPath = RNFS.DocumentDirectoryPath + "/" + FeedImageFolder;
    await createFolder(feedFolderPath);
    let newFileName = `${new Date().getTime()}_` + getFileNameFromPath(from);
    let moveToPath = RNFS.DocumentDirectoryPath + "/" + FeedImageFolder + "/" + newFileName;
    return new Promise<string>((resolve,reject) => {
        RNFS.moveFile(from,moveToPath).then(() => {
            resolve(`/${FeedImageFolder}/${newFileName}`)
        }).catch(error => {
            console.log('Error ::',error);
            reject(error)
        })
    });
};

// Build the Full path of local image from relative path from document directory and return it
export const getFeedImageFullPath = (fileName : string) => {
    return (Platform.OS === "android" ? "file://" : "") + RNFS.DocumentDirectoryPath + fileName
};

// Create the folder at specific path
const createFolder = (path : string) : Promise<void> => {
    return RNFS.mkdir(path,{
        NSURLIsExcludedFromBackupKey : true
    })
};

// Return the File name with extension from path
const getFileNameFromPath = (path : string) : string => {
    const pathArray = path.split("/");
    const lastIndex = pathArray.length - 1;
    return pathArray[lastIndex];
};
