import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupText, FormFeedback } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const GetInputComponent = ({ formik, field, index }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const error = formik.errors[field.attribute];

  const hasError = error && formik.touched[field.attribute];
  console.log(error);

  switch (field.fieldType) {
    case "textfield":
      return (
        <div>
          <Input
            type={field.type || "text"}
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            name={field.attribute}
            value={formik.values[field.attribute] || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={field.placeholder || ""}
          />
          {hasError && <FormFeedback>{error}</FormFeedback>}
        </div>
      );

    case "number":
      return (
        <div>
          <Input
            type="number"
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            name={field.attribute}
            value={formik.values[field.attribute] || ""}
            onChange={(e) => {
              // Only allow numeric input
              if (!isNaN(e.target.value) || e.target.value === "") {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            placeholder={field.placeholder || ""}
          />
          {hasError && <FormFeedback>{error}</FormFeedback>}
        </div>
      );

    case "email":
      return (
        <div>
          <Input
            type="email"
            name={field.attribute}
            value={formik.values[field.attribute] || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={field.placeholder || "Enter your email"}
            className={`form-control ${hasError ? "is-invalid" : ""}`}
          />
          {hasError && <FormFeedback>{error}</FormFeedback>}
        </div>
      );

    case "password":
      return (
        <div>
          <InputGroup>
            <Input
              type={isPasswordVisible ? "text" : "password"} // Toggle between password and text visibility
              name={field.attribute}
              value={formik.values[field.attribute] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field.placeholder || "Enter your password"}
              className={`form-control ${hasError ? "is-invalid" : ""}`} // Apply the 'is-invalid' class when there's an error
            />
            <InputGroupText onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faEye} />
            </InputGroupText>
          </InputGroup>
          {<FormFeedback>{error}</FormFeedback>}
          {error && hasError && (
            <div className="text-danger mt-1" style={{ fontSize: "14px" }}>
              {error}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};

GetInputComponent.propTypes = {
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired, // Formik's handleChange method
    handleBlur: PropTypes.func.isRequired, // Formik's handleBlur method
    values: PropTypes.object.isRequired, // Formik's values object
    errors: PropTypes.object.isRequired, // Formik's errors object
    touched: PropTypes.object.isRequired, // Formik's touched object
    setTouched: PropTypes.func.isRequired, // Formik's setTouched method
  }).isRequired,

  field: PropTypes.shape({
    fieldType: PropTypes.string.isRequired, // fieldType (e.g., "textfield", "number", "password")
    type: PropTypes.string, // type of the input (e.g., "text", "email")
    attribute: PropTypes.string.isRequired, // key to use in formik.values, formik.errors, etc.
    placeholder: PropTypes.string, // Placeholder for the input field
  }).isRequired,

  index: PropTypes.number, // Optional: index (if needed for dynamic lists)
};

export default GetInputComponent;
