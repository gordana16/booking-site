import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthStatus, logout } from "../../actions";
import RentalSearchInput from "../rental/RentalSearchInput";

class Header extends Component {
  componentDidMount() {
    this.props.checkAuthStatus();
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/rentals/");
  };

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return (
        <a
          className="nav-item nav-link active my-sm-2 clickable"
          onClick={this.handleLogout}
        >
          Logout <span className="sr-only">(current)</span>
        </a>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/login" className="nav-item nav-link my-sm-2">
            Login <span className="sr-only">(current)</span>
          </Link>
          <Link to="/register" className="nav-item nav-link my-sm-2">
            Register
          </Link>
        </React.Fragment>
      );
    }
  }
  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown my-sm-2">
          <a
            className="nav-link nav-item dropdown-toggle clickable"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Owner Section
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/rentals/new">
              Create Rental
            </Link>
            <Link className="dropdown-item" to="/rentals/manage">
              Manage Rentals
            </Link>
            <Link className="dropdown-item" to="/bookings/manage">
              Manage Bookings
            </Link>
            <Link className="dropdown-item" to="/user/profile">
              User Profile
            </Link>
          </div>
        </div>
      );
    }
  }
  render() {
    const { username, isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container ">
          <Link to="/rentals" className="navbar-brand flex-fill" href="#">
            BookWithMe
            <img src={`${process.env.PUBLIC_URL}/img/react-logo.svg`} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse flex-fill"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav flex-grow-1 ml-sm-4">
              <RentalSearchInput />
              {isAuth && (
                <a className="nav-item nav-link my-sm-2">{username}</a>
              )}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default withRouter(
  connect(
    mapStateToProps,
    { checkAuthStatus, logout }
  )(Header)
);
