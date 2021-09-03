import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // const name = this.props.route.params.username;
    // this.props.navigation.setOptions({ title: name });
    this.setState({
      // each message requires an ID, a creation date, and a user object
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          // user objects require a user ID, name, and avatar
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'this is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
   this.setState(previousState => ({
    //  appends the new message to the messages object (to be displayed in the chat)
     messages: GiftedChat.append(previousState.messages, messages),
   }))
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
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
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