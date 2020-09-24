const intitialUserState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = intitialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case "CLEAR_USER":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user_reducer;
