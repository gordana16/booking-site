import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAIL,
  UPDATE_RENTAL_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: [],
    isFetching: false,
    isUpdating: false
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

    case UPDATE_RENTAL_INIT: {
      return { ...state, errors: [], isUpdating: true };
    }

    case FETCH_RENTAL_BY_ID_SUCCESS:
    case UPDATE_RENTAL_SUCCESS: {
      return { ...state, data: action.payload, isUpdating: false };
    }
    case FETCH_RENTAL_BY_ID_FAIL:
    case UPDATE_RENTAL_FAIL: {
      return { ...state, errors: action.payload, isUpdating: false };
    }
    default:
      return state;
  }
};
