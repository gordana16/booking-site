import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import StarRatings from "react-star-ratings";
import { fetchRental, getReviews } from "../../actions";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalDetailUpdate from "./RentalDetailUpdate";
import GoogleMap from "../map/GoogleMap";
import Booking from "../booking/Booking";

class RentalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props
      .fetchRental(id)
      .then(data => data.payload._id)
      .then(rentalId => getReviews(rentalId))
      .then(reviews => this.setState({ reviews }));
  }

  setMapHeight() {
    this.forceUpdate();
  }
  renderSingleReview(review) {
    return (
      <div key={review._id} className="card review-card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2 user-image">
              <img
                src="https://image.ibb.co/jw55Ex/def_face.jpg"
                className="img img-rounded img-fluid"
                alt=""
              />
              <p className="text-secondary text-center">{review.createdAt}</p>
            </div>
            <div className="col-md-10">
              <div>
                <a>
                  <strong>{review.user.username}</strong>
                </a>
                <div className="review-section">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="orange"
                    starHoverColor="orange"
                    starDimension="25px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
              <div className="clearfix" />
              <p>{review.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderReviews() {
    const { reviews } = this.state;
    if (reviews.length === 0) {
      return <h5>Be the first to review this rental.</h5>;
    }
    return (
      <div className="row">
        <div className="col-md-8">
          <section style={{ marginBottom: "40px" }}>
            <h2>Reviews</h2>
            {reviews.map(review => this.renderSingleReview(review))}
          </section>
        </div>
      </div>
    );
  }

  renderRentalDetail() {
    const { isUpdate } = this.props.location.state || false;
    if (isUpdate)
      return (
        <div className="col-md-12">
          <RentalDetailUpdate />{" "}
        </div>
      );
    return (
      <React.Fragment>
        <div className="col-md-8">
          <RentalDetailInfo />
        </div>
        <div className="col-md-4">
          <Booking />
        </div>
        {this.renderReviews()}
      </React.Fragment>
    );
  }

  render() {
    const { rental } = this.props;
    if (!rental || !rental.bookings || rental.isUpdating) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container" id="rentalDetails">
        <ToastContainer />
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img
                ref={this.imgRef}
                onLoad={() => this.setMapHeight()}
                src={rental.image}
                alt=""
              />
            </div>
            <div className="col-md-6 ">
              <GoogleMap
                height={
                  this.imgRef.current ? this.imgRef.current.clientHeight : 0
                }
                address={`${rental.city}, ${rental.street}`}
              />
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="row">{this.renderRentalDetail()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};

export default connect(mapStateToProps, { fetchRental })(RentalDetail);
