import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/shared/Header";
import "./styles/App.css";
import RentalList from "./components/rental/RentalList";
import RentalDetail from "./components/rental/RentalDetail";
import RentalSearchList from "./components/rental/RentalSearchList";
import RentalCreate from "./components/rental/RentalCreate";
import RentalManage from "./components/rental/RentalManage";
import BookingManage from "./components/booking/BookingManage";
import UserDetail from "./components/user/UserDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ProtectedRoute from "./components/shared/auth/ProtectedRoute";
import LoggedInRoute from "./components/shared/auth/LoggedInRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to="/rentals" />}
            />
            <Route exact path="/rentals" component={RentalList} />
            <ProtectedRoute
              exact
              path="/rentals/new"
              component={RentalCreate}
            />
            <ProtectedRoute
              exact
              path="/rentals/manage"
              component={RentalManage}
            />
            <Route exact path="/rentals/:id" component={RentalDetail} />
            <Route
              exact
              path="/rentals/:city/homes"
              component={RentalSearchList}
            />
            <ProtectedRoute
              exact
              path="/bookings/manage"
              component={BookingManage}
            />
            <ProtectedRoute exact path="/user/profile" component={UserDetail} />
            <Route exact path="/login" component={Login} />
            <LoggedInRoute exact path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
