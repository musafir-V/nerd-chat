import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import firebase from "../../firebase";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    currentChannel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    messages: [],
    messageLoading: true,
  };
  componentDidMount() {
    const { currentChannel, currentUser } = this.state;
    if (currentChannel && currentUser) {
      this.addListener(currentChannel.id);
    }
  }

  addListener = (channelID) => {
    this.addMessageListner(channelID);
  };

  addMessageListner = (channelID) => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelID).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messageLoading: false });
    });
  };

  displayMessages = (messages) => {
    return (
      messages.length > 0 &&
      messages.map((message) => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.currentUser}
        />
      ))
    );
  };

  render() {
    const { messagesRef, messages, currentChannel, currentUser } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader currentChannel={currentChannel} />
        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessagesForm
          messagesRef={messagesRef}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
      </React.Fragment>
    );
  }
}
export default Messages;
