import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import "./App.css";
import ColorPanel from "./Colorpanel/ColorPanel";
import SidePanel from "./Sidepanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./Metapanel/MetaPanel";

const App = (props) => {
  // console.log(props);
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel key={props.user && props.user.uid} currentUser={props.user} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={props.channel && props.channel.id}
          currentChannel={props.channel}
          currentUser={props.user}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(App);
