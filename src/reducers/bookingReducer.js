import {
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  bookings: {
    data: [],
    errors: [],
    isFetching: false
  }
};

export const bookingReducer = (state = INITIAL_STATE.bookings, action) => {
  switch (action.type) {
    case FETCH_USER_BOOKINGS_INIT: {
      return { ...state, data: [], errors: [], isFetching: true };
    }
    case FETCH_USER_BOOKINGS_SUCCESS: {
      return { ...state, data: action.payload, isFetching: false };
    }
    case FETCH_USER_BOOKINGS_FAIL: {
      return { ...state, errors: action.payload, isFetching: false };
    }
    default:
      return state;
  }
};
