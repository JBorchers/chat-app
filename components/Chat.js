import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Button } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import AsyncStorage from "@react-native-async-storage/async-storage";

import NetInfo from '@react-native-community/netinfo';


const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBQ8rCelZWDr5meZ0sJNTLDCI5ONbBRm74",
  authDomain: "chat-app-55879.firebaseapp.com",
  projectId: "chat-app-55879",
  storageBucket: "chat-app-55879.appspot.com",
  messagingSenderId: "1049892041191",
  appId: "1:1049892041191:web:d6c0137b39bc25d7254d42",
  measurementId: "G-YK62Y0Y460"
};


export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      uid: 0,
      loggedInText: "Logging in...",
      user: {
        _id: "",
        name: "",
      },
    };

    // initializes the app
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    // references the messages collection from firebase DB
    // stores and retrieves the chat messages the users send
    this.referenceChatMessages = firebase.firestore().collection("messages");

  };

  async getMessages() {
    let messages = '';
    let uid = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      uid = await AsyncStorage.getItem('uid');

      this.setState({
        messages: JSON.parse(messages),
        uid: JSON.parse(uid),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}
  
  // Hides toolbar when the user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  componentDidMount() {
    // const name = this.props.route.params.username;
    // this.props.navigation.setOptions({ title: name });

    // immediately checks if the user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // User is online
        console.log('online');
        this.setState({
          isConnected: true,
        });

    this.getMessages();
    this.renderInputToolbar();

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
     if (!user) {
       firebase.auth().signInAnonymously();
     }
     this.setState({
       uid: user.uid,
       messages: [],
       user: {
          _id: user.uid,
          // name: name,
          avatar: 'https://placeimg.com/140/140/any',
        },
     });

     this.referenceChatUser = firebase
      .firestore()
      .collection("messages")
      .where("uid", "==", this.state.uid);

     this.unsubscribe = this.referenceChatMessages
       .orderBy("createdAt", "desc")
       .onSnapshot(this.onCollectionUpdate);
    });
  } else {
        // User is offline
        console.log('offline');
        this.setState({
          isConnected: false,
        }),

          this.getMessages();
      }
    });
  }



  addMessage() {
    const message = this.state.messages[0];
    // saves data object to Firestore
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  onSend(messages = []) {
   this.setState(previousState => ({
    //  appends the new message to the messages object (to be displayed in the chat)
     messages: GiftedChat.append(previousState.messages, messages),
   }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  // querySnapshot of all the data currently in collection
  onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // each field within each document is saved to messages object, then rendered in app by setState() function
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    var data = doc.data();
    messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
    });
  });
  this.setState({
      messages,
    });
};

  componentWillUnmount() {
    // stop authentication
    if (this.state.isConnected == false) {
    } else {
      // stop online authentication
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        // inherits props with ...props keyword
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }


  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.route.params.bgColor }}>
        <View style={styles.chatWrapper}>
            <GiftedChat
                messages={this.state.messages}
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                renderInputToolbar={this.renderInputToolbar.bind(this)}
                onSend={messages => this.onSend(messages)}
                user={this.state.user}
                onLongPress={() => this.deleteMessages()}
              />
            {/* prevents keyboard from covering messages in input field (for older android devices)  */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  chatWrapper: {
    flex: 1,
    width: '100%'
  },
})