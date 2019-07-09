import React, { Component } from "react";
import { connect } from "react-redux";
import RentalCard from "./RentalCard";
import { fetchRentals } from "../../actions";
import { toUpperCase } from "../../helpers";

class RentalSearchList extends Component {
  componentDidMount() {
    this.searchRentalByCity();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.city !== this.props.match.params.city) {
      this.searchRentalByCity();
    }
  }

  searchRentalByCity() {
    const { city } = this.props.match.params;
    this.props.fetchRentals(city);
  }
  renderFilteredRentals() {
    return this.props.filteredRentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }

  renderTitle() {
    const { city } = this.props.match.params;
    const { errors, filteredRentals } = this.props;

    let title = "";
    if (errors.length !== 0 || filteredRentals.length !== 0) {
      title =
        errors.length > 0
          ? errors[0].detail
          : `Your home in ${toUpperCase(city)}`;
    }

    return <h1 className="title"> {title} </h1>;
  }

  render() {
    return (
      <div className="container rental-list">
        {this.renderTitle()}
        <div className="row">{this.renderFilteredRentals()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredRentals: state.rentals.data,
    errors: state.rentals.errors
  };
};

export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalSearchList);
