"use client";
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container
      className="py-5 container"

    >
      <h1 className="mb-4">Contact Us</h1>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 rounded shadow">
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
            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Contact Information</h2>
          <p>Phone: (207) 538-7568</p>
          <p>Email: contact@example.com</p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
