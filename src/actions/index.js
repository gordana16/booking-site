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
  UPDATE_RENTAL_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  UPDATE_BOOKINGS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./types";

const axiosInstance = axiosService.getInstance();

function getErrorDescription(rejected) {
  return rejected.response
    ? rejected.response.data.errors || rejected.response.statusText
    : rejected.message;
}
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
      .catch(rejected => {
        dispatch({
          type: FETCH_RENTALS_FAIL,
          payload: getErrorDescription(rejected)
        });
      });
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
      .catch(rejected =>
        dispatch({
          type: FETCH_RENTALS_FAIL,
          payload: getErrorDescription(rejected)
        })
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
    .catch(rejected =>
      dispatch({
        type: FETCH_RENTAL_BY_ID_FAIL,
        payload: getErrorDescription(rejected)
      })
    );
};

export const createRental = rentalData => {
  return axiosInstance
    .post("/rentals/", { ...rentalData })
    .then(
      res => res.data,
      rejected => Promise.reject(getErrorDescription(rejected))
    );
};

export const deleteRental = id => {
  return axiosInstance
    .delete(`/rentals/${id}`)
    .then(
      res => res.data,
      rejected => Promise.reject(getErrorDescription(rejected))
    );
};

export const updateRental = (id, rentalData) => dispatch => {
  dispatch({ type: UPDATE_RENTAL_INIT });
  return axiosInstance
    .patch(`/rentals/${id}`, rentalData)
    .then(response =>
      dispatch({ type: UPDATE_RENTAL_SUCCESS, payload: response.data })
    )
    .catch(rejected =>
      dispatch({
        type: UPDATE_RENTAL_FAIL,
        payload: getErrorDescription(rejected)
      })
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
      .catch(rejected =>
        dispatch({
          type: FETCH_USER_BOOKINGS_FAIL,
          payload: getErrorDescription(rejected)
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
      rejected => Promise.reject(getErrorDescription(rejected))
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
  const userId = authService.getUserId();

  return {
    type: LOGIN_SUCCESS,
    username,
    userId
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

export const getUserDetails = userId => {
  return axiosInstance
    .get(`/users/${userId}`)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const updateUserDetails = (userId, userData) => {
  return axiosInstance
    .patch(`/users/${userId}`, userData)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
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
      .catch(rejected => dispatch(loginFailure(getErrorDescription(rejected))));
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
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const updateBookings = bookings => {
  return {
    type: UPDATE_BOOKINGS,
    bookings
  };
};

export const uploadImage = image => {
  const formData = new FormData();
  formData.append("image", image);
  return axiosInstance
    .post("/image-upload", formData)
    .then(res => res.data.imgUrl)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const getPendingPayments = () => {
  return axiosInstance
    .get("/payments")
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const acceptPayment = payment => {
  return axiosInstance
    .post("/payments/accept", payment)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const declinePayment = payment => {
  return axiosInstance
    .post("/payments/decline", payment)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

//REVIEW FEATURES

export const createReview = (reviewData, bookingId) => {
  return axiosInstance
    .post(`/reviews?bookingId=${bookingId}`, reviewData)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};

export const getReviews = rentalId => {
  return axiosInstance
    .get(`/reviews?rentalId=${rentalId}`)
    .then(res => res.data)
    .catch(rejected => Promise.reject(getErrorDescription(rejected)));
};
