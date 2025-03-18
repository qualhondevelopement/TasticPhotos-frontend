import { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: FormData) => Promise<void> | void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
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

        setFormData({ firstName: "", lastName: "", email: "", phone: "" });

        if (onSubmitSuccess) {
          onSubmitSuccess(submittedData);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    setErrors({});
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={resetForm} centered backdrop="static">
      <Modal.Header className="customer-modal">
        <Modal.Title>
          <i className="bi bi-person-lines-fill me-2"></i>
          Payment Information
        </Modal.Title>
        <Button
          variant="link"
          className="text-white p-0 ms-auto"
          onClick={resetForm}
        >
          <i className="bi bi-x-lg"></i>
        </Button>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <i className="bi bi-envelope"></i>
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <i className="bi bi-telephone"></i>
              </InputGroup.Text>
              <Form.Control
                type="tel"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button onClick={resetForm}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerFormModal;
