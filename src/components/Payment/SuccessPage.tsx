// pages/payment-success.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CartSvg from "./CartSvg";
const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <div className="payment-success-content">

            <div className="checkmark-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check-circle"
                width="100"
                height="100"
                style={{ color: 'green' }}
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>

            </div>
            <h1 className="mt-4">Payment Successful</h1>
            <p>Your payment was processed successfully. Thank you!</p>
            <Button variant="success" className="mt-3" onClick={() => router.push('/')}>
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
   
  );
};

export default PaymentSuccess;
