import { StatusBar } from 'expo-status-bar';
import React from 'react';
// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import react native gesture handler
import 'react-native-gesture-handler';

// Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
 

 render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
