import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: [],
    isFetching: false
  },
  rental: {
    data: {},
    errors: []
  }
};

export const rentalsReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT: {
      return { ...state, data: [], errors: [], isFetching: true };
    }
    case FETCH_RENTALS_SUCCESS: {
      return { ...state, data: action.payload, isFetching: false };
    }
    case FETCH_RENTALS_FAIL: {
      return { ...state, errors: action.payload, isFetching: false };
    }
    default:
      return state;
  }
};

export const singleRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_INIT: {
      return { ...state, data: {}, errors: [] };
    }
    case FETCH_RENTAL_BY_ID_SUCCESS: {
      return { ...state, data: action.payload };
    }
    case FETCH_RENTAL_BY_ID_FAIL: {
      return { ...state, errors: action.payload };
    }
    default:
      return state;
  }
};
