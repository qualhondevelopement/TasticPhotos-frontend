"use client";

import { Modal, Button } from "react-bootstrap";
import React from "react";
import "./style.css"; // Ensure to create a CSS file for custom styles

interface GoBackConfirmationProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const GoBackConfirmation: React.FC<GoBackConfirmationProps> = ({
  show,
  handleClose,
  handleDelete,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      className="go-back-modal" // Add custom class for additional styling
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Confirm Navigation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="modal-message">
          Are you sure you want to go back to the home page? Any unsaved changes
          will be lost.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          className="me-2"
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes, Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoBackConfirmation;
