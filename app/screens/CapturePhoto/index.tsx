import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, ImageBackground, Platform} from 'react-native';

// Third Party Library
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from "@react-navigation/stack";
import NetInfo from '@react-native-community/netinfo';

// Component
import Loader from "../../component/Loader";

// Utility
import {horizontalScale, verticalScale} from "../../utility/Scale";
import {requestLocationPermission} from "../../helper/PermisstionManager";
import {fetchCurrentLocation} from "../../helper/GeoLocationManager";
import {moveCapturedPhotoToDocumentDir} from "../../helper/FileManager";
import {reverseGeocodeRequest} from "../../api/ReverseGeoCodeLocation";
import {getGeocodeLocationWeatherInfo} from "../../api/OpenWeatherRequests";
import Routes from "../../navigation/Routes";
import {showAlert} from "../../utility";
import Strings from "../../utility/string";

// Hooks
import {useFeeds} from "../../hooks/useFeeds";
import {isTablet} from "react-native-device-info";

interface Props {
    navigation : StackNavigationProp<any,any>,
    route : any
}

/*
* For Capture the Photo using camera and save in feed with user's current location and temperature info
* */
const CapturePhoto = (props: Props) => {

    const [{cameraRef}] = useCamera();
    const {createFeed,todayFeed,updateFeed} = useFeeds();
    const safeAreaInsets = useSafeAreaInsets();
    const [capturedImagePath, setCapturedImagePath] = useState(null);
    const [loaderVisible,setLoaderVisible] = useState<boolean>(false);

    const {route} = props;
    const openForEdit = route.params?.forEdit ?? false;

    /*
    * Save Photo in local db with location and weather info
    * */
    const saveCapturedPhoto = async () => {
        try {

            const isInternetAvailable = await NetInfo.fetch();
            if (!isInternetAvailable){
                showAlert(Strings.noInternetMsg);
                return
            }

            const haveLocationAccess = await requestLocationPermission();
            if (!haveLocationAccess){
                showAlert(Strings.locationPermissionRequired);
            }

            setLoaderVisible(true);
            let imageNewPath = await moveCapturedPhotoToDocumentDir(capturedImagePath ?? "");
            const userCurrentLocation = await fetchCurrentLocation();
            const geocodeResponse = await reverseGeocodeRequest(userCurrentLocation.coords.latitude,userCurrentLocation.coords.longitude);
            const locationWeatherInfo = await getGeocodeLocationWeatherInfo(userCurrentLocation.coords.latitude,userCurrentLocation.coords.longitude);
            let updateOrAddedFeedId : number;
            if (todayFeed !== null){
                updateOrAddedFeedId = todayFeed?.feed_id ?? 0;
                // Update Feed Operation
                let updateFeedObj = Object.assign({},todayFeed);
                updateFeedObj.lat = geocodeResponse.lat;
                updateFeedObj.lng = geocodeResponse.lng;
                updateFeedObj.city = geocodeResponse.city;
                updateFeedObj.country = geocodeResponse.country;
                updateFeedObj.image_path = imageNewPath ?? "";
                updateFeedObj.temperature = locationWeatherInfo.temperature;
                await updateFeed(updateFeedObj);
            }
            else{
                // Create New Feed
                updateOrAddedFeedId = await createFeed({
                    lat : geocodeResponse.lat,
                    lng : geocodeResponse.lng,
                    city : geocodeResponse.city,
                    country : geocodeResponse.country,
                    image_path : imageNewPath ?? "",
                    temperature : locationWeatherInfo.temperature,
                    thought : ""
                });
            }
            setLoaderVisible(false);
            if (openForEdit)
                props.navigation.goBack();
            else{
                props.navigation.navigate(Routes.FeedDetail,{
                    feed_id : updateOrAddedFeedId
                });
            }
            setCapturedImagePath(null);
        }
        catch (e) {
            console.log('Error in capture ::',e);
            showAlert(e.message);
            setLoaderVisible(false);
            setCapturedImagePath(null);
        }
    };

    const btnCapturePhotoClick = async () => {
        if (cameraRef) {
            try{
                const options = {quality: 1.0};
                const data = await cameraRef.current.takePictureAsync(options);
                setCapturedImagePath(data.uri);
            }
            catch (e) {
                showAlert(e)
            }
        }
    };

    const btnCancelClick = () => {
        setCapturedImagePath(null)
    };

    const btnConfirmPhotoClick = async () => {
        saveCapturedPhoto().then(() => {})
    };

    const renderCaptureCameraView = () => {
        return (
            <>
                <RNCamera ref={cameraRef}
                          type={RNCamera.Constants.Type.back}
                          captureAudio={false}
                          style={Style.CameraView}/>
                <TouchableOpacity
                    style={[Style.CapturePhotoButton, {bottom: safeAreaInsets.bottom + verticalScale(20)}]}
                    onPress={btnCapturePhotoClick}>
                    <Image source={{uri: 'ic_capture_photo'}} style={Style.CapturePhotoIcon}/>
                </TouchableOpacity>
            </>
        )
    };

    const renderConfirmCaptureImageView = () => {
        return (
            <ImageBackground style={Style.CapturedImageView}
                             resizeMode={'cover'}
                             source={{uri: Platform.OS === 'android' ? (capturedImagePath ?? "") : (capturedImagePath ?? "").replace("file://", "")}}>
                <View style={[Style.ConfirmCancelButtonView, {bottom: safeAreaInsets.bottom}]}>
                    {/* Cancel Button */}
                    <TouchableOpacity style={Style.IconButtonContainer}
                                      onPress={btnCancelClick}>
                        <Image source={{uri: 'ic_close'}}
                               style={Style.IconButton}/>
                    </TouchableOpacity>

                    {/* Done Button */}
                    <TouchableOpacity style={Style.IconButtonContainer}
                                      onPress={btnConfirmPhotoClick}>
                        <Image source={{uri: 'ic_check'}}
                               style={Style.IconButton}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    };

    return (
        <View style={Style.Container}>
            {
                capturedImagePath ?
                    renderConfirmCaptureImageView()
                    :
                    renderCaptureCameraView()
            }
            <Loader visible={loaderVisible}/>
        </View>
    );
};

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
    },
    CameraView: {
        width: '100%',
        height: '100%'
    },
    CapturePhotoButton: {
        position: 'absolute',
        width: horizontalScale(isTablet() ? 55 : 60),
        aspectRatio: 1
    },
    CapturePhotoIcon: {
        width: '100%',
        aspectRatio: 1
    },
    CapturedImageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    ConfirmCancelButtonView: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
    },
    IconButtonContainer: {
        width: horizontalScale(80),
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconButton: {
        width: horizontalScale(30),
        aspectRatio: 1
    }
});

export default CapturePhoto
