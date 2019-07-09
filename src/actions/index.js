import axios from "axios";
import authService from "../services/authService";
import axiosService from "../services/axiosService";
import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./types";

const axiosInstance = axiosService.getInstance();

//rental actions
export const fetchRentals = city => {
  const url = city ? `/api/v1/rentals?city=${city}` : "/api/v1/rentals";
  return dispatch => {
    dispatch({ type: FETCH_RENTALS_INIT });
    return axios
      .get(url)
      .then(response =>
        dispatch({ type: FETCH_RENTALS_SUCCESS, payload: response.data })
      )
      .catch(({ response }) =>
        dispatch({ type: FETCH_RENTALS_FAIL, payload: response.data.errors })
      );
  };
};

export const fetchUserRentals = () => {
  return dispatch => {
    dispatch({ type: FETCH_RENTALS_INIT });
    return axiosInstance
      .get("/rentals/manage")
      .then(response =>
        dispatch({ type: FETCH_RENTALS_SUCCESS, payload: response.data })
      )
      .catch(({ response }) =>
        dispatch({ type: FETCH_RENTALS_FAIL, payload: response.data.errors })
      );
  };
};

export const fetchRental = id => dispatch => {
  dispatch({ type: FETCH_RENTAL_BY_ID_INIT });
  return axios
    .get(`/api/v1/rentals/${id}`)
    .then(response =>
      dispatch({ type: FETCH_RENTAL_BY_ID_SUCCESS, payload: response.data })
    )
    .catch(({ response }) =>
      dispatch({ type: FETCH_RENTAL_BY_ID_FAIL, payload: response.data.errors })
    );
};
export const createRental = rentalData => {
  return axiosInstance
    .post("/rentals/", { ...rentalData })
    .then(
      res => res.data,
      ({ response }) => Promise.reject(response.data.errors)
    );
};

export const deleteRental = id => {
  return axiosInstance
    .delete(`/rentals/${id}`)
    .then(
      res => res.data,
      ({ response }) => Promise.reject(response.data.errors)
    );
};

//booking actions
export const fetchUserBookings = () => {
  return dispatch => {
    dispatch({ type: FETCH_USER_BOOKINGS_INIT });
    return axiosInstance
      .get("/bookings/manage")
      .then(response =>
        dispatch({ type: FETCH_USER_BOOKINGS_SUCCESS, payload: response.data })
      )
      .catch(({ response }) =>
        dispatch({
          type: FETCH_USER_BOOKINGS_FAIL,
          payload: response.data.errors
        })
      );
  };
};

//auth actions
export const register = userData => {
  return axios
    .post("/api/v1/users/register", { ...userData })
    .then(
      res => res.data,
      ({ response }) => Promise.reject(response.data.errors)
    );
};

export const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
  };
};

export const checkAuthStatus = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      return dispatch(loginSuccess());
    }
    return dispatch({ type: LOGOUT });
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post("/api/v1/users/auth", { ...userData })
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => dispatch(loginFailure(response.data.errors)));
  };
};

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  };
};

export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
