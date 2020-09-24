import * as actionTypes from "./types";

const channelChange = (channel) => {
  return {
    type: actionTypes.CHANGE_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};

export default channelChange;
