import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const isOwnMessage = (message, user) => {
  return user.uid === message.user.uid ? "message__self" : "";
};

const timeFromNow = (timestamp) => moment(timestamp).fromNow();

const Message = ({ message, user }) => {
  if (message && user)
    return (
      <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={isOwnMessage(message, user)}>
          <Comment.Author as="a">{message.user.name}</Comment.Author>
          <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
          <Comment.Text>{message.content}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  else return <div></div>;
};

export default Message;
