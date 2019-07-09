import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRental } from "../../actions";
import RentalDetailInfo from "./RentalDetailInfo";
import GoogleMap from "../map/GoogleMap";
import Booking from "../booking/Booking";

class RentalDetail extends Component {
  constructor(props) {
    super(props);
    //this.state = { mapHeight: 0 };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRental(id);
  }

  setMapHeight() {
    this.forceUpdate();
  }

  render() {
    const { rental } = this.props;

    if (!rental || !rental.bookings) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container" id="rentalDetails">
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
          <div className="row">
            <div className="col-md-8">
              <RentalDetailInfo rental={rental} />
            </div>
            <div className="col-md-4">
              <Booking />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { rental: state.rental.data };
};

export default connect(
  mapStateToProps,
  { fetchRental }
)(RentalDetail);
