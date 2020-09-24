import { CHANGE_CHANNEL } from "../actions/types";
const intitialChannelState = {
  currentChannel: null,
};

const channel_reducer = (state = intitialChannelState, action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      };
    default:
      return state;
  }
};

export default channel_reducer;
