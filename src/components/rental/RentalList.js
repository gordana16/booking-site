import React, { Component } from "react";
import { connect } from "react-redux";
import RentalCard from "./RentalCard";
import { fetchRentals } from "../../actions";

class RentalList extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }

  renderList() {
    return this.props.rentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  render() {
    return (
      <div className="container rental-list">
        <h1 className="title">Accomodation all around world</h1>
        <div className="row">{this.renderList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { rentals: state.rentals.data };
};
export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalList);
