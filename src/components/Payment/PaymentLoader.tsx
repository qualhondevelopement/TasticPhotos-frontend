import React from "react";
import { Spinner } from "react-bootstrap";
import "./index.css";

const PaymentLoader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Spinner animation="border" role="status" className="loader-spinner mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="loader-text text-center">
        <p>Verifying payment... Please wait.</p>
      </div>
    </div>
  );
};

export default PaymentLoader;
