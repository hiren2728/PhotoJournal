/* Third Party Library */
import LocalizedStrings from 'react-native-localization'

// Strings Files as per Language
import EnglishString from "./english";

let Strings = new LocalizedStrings({
    en: {
        ...EnglishString
    }
});

export default Strings;
