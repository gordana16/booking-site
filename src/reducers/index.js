import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { rentalsReducer, singleRentalReducer } from "./rentalReducer";
import authReducer from "./authReducer";
import { bookingReducer } from "./bookingReducer";

export default combineReducers({
  rentals: rentalsReducer,
  rental: singleRentalReducer,
  bookings: bookingReducer,
  form: formReducer,
  auth: authReducer
});
