"use client";
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { LiaAddressCardSolid } from "react-icons/lia";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="contact-page">
      <section className="cart-banner">
        <h3 className="text-white">Contact Us</h3>
      </section>{" "}
      <section className="py-5 container">
        <Row>
          <Col md={6}>
            <h2 className="mb-4">Contact Information</h2>
            <div className="d-flex align-items-center">
              <FiPhoneCall color="#0d6efd" className="me-2" />
              <span className="">Phone: (207) 538-7568</span>
            </div>
            <div className="d-flex align-items-center">
              <HiOutlineMail color="#0d6efd" className="me-2" />
              <span className="">Email: contact@tastic.com</span>
            </div>
            <div className="d-flex align-items-center">
              <LiaAddressCardSolid color="#0d6efd" className="me-2" />
              <span className="">Address: 123 Main St, USA</span>
            </div>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit} className="p-4 rounded contact-form">
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Your message"
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="custom-btn d-flex align-items-center w-100 justify-content-center"
              >
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ContactPage;
