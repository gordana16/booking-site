import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, isAuth: true, errors: [], username: action.username };
    }
    case LOGIN_FAILURE: {
      return { ...state, errors: action.errors };
    }
    case LOGOUT: {
      return { ...state, isAuth: false, username: "" };
    }
    default:
      return state;
  }
};
