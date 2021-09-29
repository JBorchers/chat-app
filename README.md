# chat-app

## Description
Cross-Platform Native App created with [React Native](https://reactnative.dev/) and the Expo framework. It uses the Gifted Chat library to create the UI of the Chat room, and React Navigation to navigate between the screens.

## Features
+ An imput on the start screen where the user can enter a username (not required).
+ An array of colors where the user can choose the background theme of the Chat Room. The default is white.
+ After the user clicks the "Start Chatting" button, the athentication will take place. The App is using an Anonymous Authentication and the user will not be prompted for credentials. Because of the Anonymous Authentication the user can only see the history of his conversations as long as he is using the same device he was authenticated with.
+ Pressing the "+" button inside the message input,will open a menu where the user can choose whether to select an image from the device's library, take a new picture or send their location.

## Libraries
* [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
* [React Navigation](https://reactnavigation.org/)

## Running the App
<br>

1. To run the app on your device, you need the last __Node.js LTS__ version and the Expo CLI installed globally.

        npm install -g expo-cli

2. Clone the repo and install all the dependencies in package.json.
        
        npm install

3. Start the App with
    
        expo start
    This will open a new Tab in your browser.

<hr /> <br>

4. To run the App on a smartphone
    + create an [expo account](https://expo.dev/signup) than download the __Expo Go__ app from the store on your smartphone.
    + Connecto your Smartphone and your Computer to the same wireless network.
    + On Android use the __Expo Go__ app to scan the QR Code in the new tab of your web browser, opened after running "expo start".
    + On iOS, use the built-in QR code scanner of the Camera app.
    + The "Hello-World" app should be visible now on your smartphone.

<hr /> <br>

5. To run the App an emulator
    
    + In your web browser go to the tab opened after running "expo start" and click on "Run on Android device/emulator" or "Run on IOS simulator".
<hr /> <br>

## Platforms
IOS

Android
