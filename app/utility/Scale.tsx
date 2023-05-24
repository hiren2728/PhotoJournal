import {
    PixelRatio,
    Dimensions
} from 'react-native';

const isTablet = () => {
    const {width, height} = Dimensions.get('window');
    let pixelDensity = PixelRatio.get();
    let adjustedWidth = width * pixelDensity;
    let adjustedHeight = height * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
        return true;
    } else return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
};


/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
    const dim = Dimensions.get('window');
    return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('window');
    return dim.width >= dim.height;
};

/*
* Guideline sizes are based on standard ~5" screen mobile device
* */
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/*
*  Method for Scale the space based on screen size
* */
// Scale number based on screen's height in percentage
const verticalPercentageScale = (percentage: number) => {
    const {height} = Dimensions.get('window');
    return  (percentage / 100) * height
};

// Scale number based on screen's width in percentage
const horizontalPercentageScale = (percentage: number) => {
    const {width} = Dimensions.get('window');
    return (percentage / 100) * width
};

// Scale number based on screen's width
const horizontalScale = (size: number) => {
    const {width} = Dimensions.get('window');
    return width / (isPortrait() ? guidelineBaseWidth : guidelineBaseHeight) * size;
};

// Scale number based on screen's height
const verticalScale = (size: number) => {
    const {height} = Dimensions.get('window');
    return height / (isPortrait() ? guidelineBaseHeight : guidelineBaseWidth) * size
};

// Scale font size based on screen's width and height
const scaleFontSize = (size: number | undefined) => {
    let divider = isTablet() ? 600 : 375;
    const {width, height} = Dimensions.get('window');
    const realWidth = height > width ? width : height;
    return Math.round((size ?? 0) * realWidth / divider);
};

export {
    horizontalScale,
    horizontalPercentageScale,
    verticalScale,
    verticalPercentageScale,
    scaleFontSize,
    isLandscape,
    isPortrait
}
