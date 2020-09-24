import React from "react";
import { Header, Input, Icon, Segment } from "semantic-ui-react";
class MessagesHeader extends React.Component {
  render() {
    return (
      <Segment clearing>
        {" "}
        <Header as="h2" floated={true} style={{ marginBottom: 0 }}>
          <span>
            {this.props.currentChannel && this.props.currentChannel.name}
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}
export default MessagesHeader;
