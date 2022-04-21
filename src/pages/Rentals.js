import React from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Rentals = () => {

  const { state: searchFilters } = useLocation();

  return (
    <>
      {searchFilters &&
        <div>
          {searchFilters}
        </div>}
    </>
  );
};

export default Rentals;
