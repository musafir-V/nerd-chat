import React from "react";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  ModalActions,
  Button,
} from "semantic-ui-react";
import { connect } from "react-redux";

import channelChange from "../../actions/changeChannel";
import firebase from "../../firebase";

class Channels extends React.Component {
  state = {
    channels: [],
    modal: false,
    firstLoad: true,
    channelName: "", // Used for taking input while making channel
    channelDetail: "", // Used for taking input while making channel
    channelsRef: firebase.database().ref("channels"),
    currentUser: this.props.currentUser,
    activeChannelID: "",
  };
  componentDidMount() {
    this.addListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }
  removeListener = () => {
    this.state.channelsRef.off();
  };
  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true });

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;

  handleSubmit = () => {
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetail, currentUser } = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      deatils: channelDetail,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetail: "" });
        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setFirstChannel = () => {
    if (this.state.firstLoad && this.state.channels.length > 0) {
      const firstChannel = this.state.channels[0];
      this.setActiveChannel(firstChannel);
      this.props.channelChange(firstChannel);
      this.setState({ firstLoad: false });
    }
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };

  addListener = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };
  channelChange = (channel) => {
    this.setActiveChannel(channel);
    this.props.channelChange(channel);
  };

  displayChannels = (channels) => {
    if (channels.length) {
      return channels.map((channel) => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.channelChange(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
        >
          # {channel.name}
        </Menu.Item>
      ));
    }
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              Nerd Groups{" "}
            </span>
            ({channels.length})<Icon name="add" onClick={this.openModal} />
            {this.displayChannels(this.state.channels)}
          </Menu.Item>
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Create a Nerd Group</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of group"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="Deatils of group"
                  name="channelDetail"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <ModalActions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </ModalActions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { channelChange })(Channels);
