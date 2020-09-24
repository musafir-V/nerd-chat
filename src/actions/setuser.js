import * as actionTypes from "../actions/types";

const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export default setUser;
