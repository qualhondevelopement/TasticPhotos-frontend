"use client";

import { Modal, Button } from "react-bootstrap";
import React from "react";

interface DeleteConfirmationProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
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
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you really want to remove this image?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
