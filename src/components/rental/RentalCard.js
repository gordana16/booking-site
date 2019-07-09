import React from "react";
import { Link } from "react-router-dom";

const RentalCard = props => {
  const rental = props.rental;
  return (
    <div className="col-md-3 col-sm-6">
      <Link to={`/rentals/${rental._id}`} className="card-link">
        <div className="card">
          <img className="card-img-top" src={rental.image} alt={rental.title} />
          <div className="card-body">
            <h6 className={`card-subtitle ${rental.category} mb-2`}>
              {rental.shared ? "Shared" : "Whole"} {rental.category} &#183;
              {rental.city}
            </h6>
            <h5 className="card-title">{rental.title}</h5>

            <p className="card-text text-muted">
              ${rental.dailyRate} &#183; Free cancellation!
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
