import React from 'react';
import {
    StatusBar
} from 'react-native';

// Third Party Library
import {NavigationContainer} from '@react-navigation/native';

// Component
import RootNavigation from "./app/navigation/RootNavigation";

// Utility
import {FeedContextProvider} from './app/context/DBContext';
import {navigationRef} from "./app/navigation/GlobalNavigationRef";
import Color from "./app/utility/Color";

const App = () => {
    return (
        <FeedContextProvider>
            <StatusBar backgroundColor={Color.gray_dark}/>
            <NavigationContainer ref={navigationRef}>
                <RootNavigation/>
            </NavigationContainer>
        </FeedContextProvider>
    );
};

export default App;
