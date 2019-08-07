import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserDetails, updateUserDetails } from "../../actions";

const INIT_USER_DETAILS = {
  firstname: "",
  lastname: "",
  username: "",
  balance: "",
  phone: "",
  email: "",
  location: ""
};
class UserDetail extends Component {
  state = {
    redirect: false,
    userDetails: INIT_USER_DETAILS
  };

  componentDidMount() {
    const { userId } = this.props.auth;
    if (userId) {
      this.getUserDetails(userId);
    }
  }
  componentDidUpdate(prevProps) {
    const { isAuth, userId } = this.props.auth;

    if (!isAuth) {
      this.setState({ redirect: true });
    } else {
      if (
        !prevProps.auth.isAuth ||
        this.state.userDetails === INIT_USER_DETAILS
      ) {
        this.getUserDetails(userId);
      }
    }
  }

  getUserDetails(userId) {
    const { userDetails } = this.state;
    getUserDetails(userId).then(
      details => {
        this.setState({
          userDetails: { ...userDetails, ...details }
        });
      },
      err => console.error(err)
    );
  }
  onChangeHandler(e) {
    const { userDetails } = this.state;
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ userDetails: { ...userDetails, [name]: value } });
  }

  handleSubmit(e) {
    const { userDetails } = this.state;
    const { userId } = this.props.auth;
    e.preventDefault();
    updateUserDetails(userId, userDetails).then(
      details => toast.success("Data has been successfuly updated!"),
      err => {
        console.error(err);
        this.resetUserDetails();
      }
    );
  }

  resetUserDetails() {
    this.setState({ userDetails: INIT_USER_DETAILS });
  }

  render() {
    const { redirect, userDetails } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container bootstrap snippet user-details">
        <ToastContainer />
        <div className="row">
          <div className="col-sm-10">
            <h1>{userDetails.username}</h1>
          </div>
          <div className="col-sm-2">
            <div className="user-balance">
              <h4> Balance: {userDetails.balance / 100} $</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="text-center">
              <img
                src="https://api.adorable.io/avatars/285/abott@adorable.png"
                className="avatar rounded-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                className="text-center center-block file-upload"
              />
            </div>
            <br />
          </div>
          <div className="col-sm-9">
            <Link
              to="/rentals"
              className="nav-item nav-link clickable home-link"
            >
              Home
            </Link>

            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <hr />
                <form
                  className="form"
                  id="updateUserDataForm"
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="firstname">
                        <h4>First name</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        id="firstname"
                        value={userDetails.firstname}
                        onChange={e => this.onChangeHandler(e)}
                        placeholder=""
                        title="enter your first name if any."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="lastname">
                        <h4>Last name</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        id="lastname"
                        value={userDetails.lastname}
                        onChange={e => this.onChangeHandler(e)}
                        placeholder=""
                        title="enter your last name if any."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="phone">
                        <h4>Phone</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phone"
                        value={userDetails.phone}
                        onChange={e => this.onChangeHandler(e)}
                        placeholder=""
                        title="enter your phone number if any."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="email">
                        <h4>Email</h4>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={userDetails.email}
                        onChange={e => this.onChangeHandler(e)}
                        placeholder=""
                        title="enter your email."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-6">
                      <label htmlFor="location">
                        <h4>Location</h4>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"
                        value={userDetails.location}
                        onChange={e => this.onChangeHandler(e)}
                        placeholder=""
                        title="enter a location"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <br />
                      <button className="btn btn-lg btn-success" type="submit">
                        <i className="glyphicon glyphicon-ok-sign" /> Save
                      </button>
                      <button
                        onClick={() => this.resetUserDetails()}
                        className="btn btn-lg"
                        type="reset"
                      >
                        <i className="glyphicon glyphicon-repeat" /> Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(UserDetail);
