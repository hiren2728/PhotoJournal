# rn-hiren2728

## Tools for Set Up Development environment 
1. Windows / Mac 
2. Visual Studio Code
3. [Android Studio](https://developer.android.com/studio/install.html) / [Xcode (iOS)](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
4. Built-in emulator in Android Studio
5. Built-in simulator in Xcode
6. [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
7. [Node.js](https://nodejs.org/en/download/)
8. [Homebrew](https://brew.sh/)
    * Install the watchman using Homebrew by run this command : **brew install watchman**
9. [React native installation Guide](https://reactnative.dev/docs/environment-setup)
    * follow the **React Native CLI Quickstart** section on installtion guide page 
10. [Cocoapod for iOS](https://cocoapods.org/)

## Project SetUp 
1. Check out the project from github
2. Run Command "**yarn**" for node module installation
3. Run Command "**yarn cache clean**" for clean cache to avoid unwanted error due to cache
3. **Step for run app on android device / simulator**
   * Run command : **npx react-native run-android**
   * **Note** If face issue related to permission then run command with **sudo** like **sudo npx react-native run-android**
  
4. **Step for run app on iOS Device / Simulator**
    * Move to iOS Folder by running command : **cd ios** 
    * Run command : **pod install** to install iOS depencecy using cocoapods
    * After complete pod installation step, Back to root folder and run command **npx react-native run-ios**
