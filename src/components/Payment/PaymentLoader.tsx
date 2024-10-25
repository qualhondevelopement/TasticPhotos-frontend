import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./index.css";
const PaymentLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Verifying payment...",
    "Verification done!",
    "Getting photos...",
    "Zipping photos...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Spinner animation="border" role="status" className="loader-spinner mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="loader-text text-center">
        {steps.map((step, index) => (
          <div key={index} className="loader-step d-flex align-items-center">
            {currentStep > index ? (
              <span className="checkmark me-2">✔️</span>
            ) : (
              <span className="step-indicator me-2">{index + 1}.</span>
            )}
            <span
              className={`step-message ${
                currentStep === index ? "current" : ""
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentLoader;
