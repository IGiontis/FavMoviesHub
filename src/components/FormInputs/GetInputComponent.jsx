import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const GetInputComponent = ({ formik, field, index }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  switch (field.fieldType) {
    case "textfield":
      return (
        <div>
          <Input
            type={field.type || "text"}
            className={
              "form-control" + (formik.errors[field.attribute] && formik.touched[field.attribute] ? " is-invalid" : "")
            }
            name={field.attribute}
            value={formik.values[field.attribute] || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={field.placeholder || ""}
          />
        </div>
      );

    case "number":
      return (
        <div>
          <Input
            type="number"
            className={
              "form-control" + (formik.errors[field.attribute] && formik.touched[field.attribute] ? " is-invalid" : "")
            }
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
            className={
              "form-control" + (formik.errors[field.attribute] && formik.touched[field.attribute] ? " is-invalid" : "")
            }
          />
        </div>
      );

    case "password":
      return (
        <div>
          <InputGroup>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              className={
                "form-control" +
                (formik.errors[field.attribute] && formik.touched[field.attribute] ? " is-invalid" : "")
              }
              name={field.attribute}
              value={formik.values[field.attribute] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field.placeholder || "Enter your password"}
            />
            <InputGroupText onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faEye} />
            </InputGroupText>
          </InputGroup>
        </div>
      );

    default:
      return null;
  }
};

// Define prop types
GetInputComponent.propTypes = {
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired, // Formik's handleChange method
    handleBlur: PropTypes.func.isRequired, // Formik's handleBlur method
    values: PropTypes.object.isRequired, // Formik's values object
    errors: PropTypes.object.isRequired, // Formik's errors object
    touched: PropTypes.object.isRequired, // Formik's touched object
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
