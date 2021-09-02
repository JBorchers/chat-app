import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlightBase, TouchableOpacity, Button, Alert, ScrollView, ImageBackground } from 'react-native';

// sets background image
const image = require('../assets/BackgroundImage.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  
  //  alert the user input
  alertMyText (input =[]) {
    Alert.alert(input.text);
  }
  
  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
      <View style={styles.titleWrapper}>
          <Text style={styles.title}>Chat App</Text>
      </View>
      <View style={styles.optionsWrapper}>
      <View style={styles.inputWrapper}>
          <TextInput
          style={styles.nameInput}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder='Enter your name...'
          />
      </View>
      
      <View>
          <Text style={styles.colorOptionsText}>Choose a background color:</Text>

           <View style={{flexDirection:'row', marginTop: 12}}>
              {/* the "onPress" method is used to set the "bgColor" state to a string with the hex value of the color each option represents */}
              <TouchableOpacity 
                  style={[styles.pickBgColor, {backgroundColor: '#000'}]}
                  onPress={() => this.setState({bgColor: '#000'})}
              />
              <TouchableOpacity 
                  style={[styles.pickBgColor, {backgroundColor: '#064C75'}]} 
                  onPress={() => this.setState({bgColor: '#064C75'})}
              />
              <TouchableOpacity 
                  style={[styles.pickBgColor, {backgroundColor: '#0697B1'}]} 
                  onPress={() => this.setState({bgColor: '#0697B1'})}
              />
              <TouchableOpacity 
                  style={[styles.pickBgColor, {backgroundColor: '#469A6E'}]} 
                  onPress={() => this.setState({bgColor: '#469A6E'})}
              />
          </View>
          <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.button}
            title='Start Chatting'
            // The second argument of the navigate() method is the way the additional props are passed to the Chat component
            onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name, bgColor: this.state.bgColor})}>
            <Text style={styles.buttonText}>Start Chatting</Text> 
        </TouchableOpacity>
        </View>
      </View>
        
      </View>
      
      </ImageBackground>
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    
    inputWrapper: {
      flex: 0,
      width: '88%',
      backgroundColor: 'rgba(245, 245, 245, 0.7)',
      borderWidth: 1,
      borderColor: '#2F4F4F',
      padding: 20,
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 5,
      margin: 20
    },

    buttonWrapper: {
      flex: 0,
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      borderRadius: 5,
      marginTop: 20
    },
    
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    
    button: {
       backgroundColor: '#476380',
       flex: 0,
       justifyContent: 'space-evenly',
       alignItems: 'center',
       borderRadius: 5,
    },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      margin: 8,
      padding: 8
    },
    
    titleWrapper: {
      flex: 0,
      justifyContent: 'space-evenly',
    },
    
    title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#fff',
    },
    
    nameInput: {
      fontSize: 16,
      fontWeight: '300',
      justifyContent: 'center'
    },
    
    optionsWrapper: {
      flex: 0,
        // height: '44%',
        // minHeight: 240,
        width: '88%',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        padding: 6,
        margin: 6,
        borderRadius: 5
    },
    
    colorOptionsText: {
      fontSize: 16,
      opacity: 100,
      color: '#757083',
      margin: 20
    },

    pickBgColor: {
        width: 50,
        height: 50,
        marginRight: 14,
        borderRadius: 25,
        padding: 6
    }
    
  })