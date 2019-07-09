import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RentalSearchInput extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const city = this.searchInput.current.value;
    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
  }

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0 mr-auto"
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          ref={this.searchInput}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Try 'New York'"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-1 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default withRouter(RentalSearchInput);
