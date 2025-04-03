import { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: FormData) => Promise<void> | void;
}

interface FormData {
  name: string;
  email: string;
}

interface Errors {
  name?: string;
  email?: string;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;

    updatedValue = updatedValue.trimStart();

    if (name === "name") {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    // Trim the form data before validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const submittedData = { ...formData };

        submittedData.name = submittedData.name.trim();
        submittedData.email = submittedData.email.trim();

        setFormData({ name: "", email: "" });

        if (onSubmitSuccess) {
          onSubmitSuccess(submittedData);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "" });
    setErrors({});
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={resetForm} centered backdrop="static">
      <Modal.Header className="d-flex flex-column">
        <div className="d-flex justify-content-between w-100">
          <Modal.Title className="fs-4">Just One More Step! </Modal.Title>
          <Button variant="close" onClick={onClose} aria-label="Close" />
        </div>
        <small className="text-muted text-start w-100">
          Please enter your name and email to proceed to checkout.
        </small>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="name" className="">
            <Form.Label className="mb-1 text-start w-100">Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                isInvalid={!!errors.name}
                className="shadow-none"
                maxLength={40}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-start w-100"
              >
                {errors.name}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="email" className="mt-3 ">
            <Form.Label className="mb-1 text-start w-100">Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                isInvalid={!!errors.email}
                className="shadow-none"
                maxLength={40}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-start w-100"
              >
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button type="submit" className="custom-btn">
              SUBMIT
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerFormModal;
