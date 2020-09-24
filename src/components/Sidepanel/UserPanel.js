import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

import firebase from "../../firebase";

class UserPanel extends React.Component {
  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>SignOut</span>,
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed_out"));
  };

  render() {
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* This is main App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Nerd-Chat</Header.Content>
            </Header>
            <Header style={{ padding: "0.25em" }} as="h4">
              <Dropdown
                trigger={
                  <span>
                    <Image
                      src={this.props.currentUser.photoURL}
                      space="right"
                      avatar
                    />
                    {this.props.currentUser.displayName}
                  </span>
                }
                options={this.dropDownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
