import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username: "",
  userId: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        errors: [],
        username: action.username,
        userId: action.userId
      };
    }
    case LOGIN_FAILURE: {
      return { ...state, errors: action.errors };
    }
    case LOGOUT: {
      return { ...state, isAuth: false, username: "", userId: "" };
    }
    default:
      return state;
  }
};
