import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupText, FormFeedback } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const GetInputComponent = ({ formik, field, index }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (field.autofocus && index === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [field.autofocus, index]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const error = formik.errors[field.attribute];
  const hasError = error && formik.touched[field.attribute];

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
            autoFocus={field.autofocus && index === 0} // Apply autofocus only if it's the first field
            innerRef={inputRef} // Assign ref to allow programmatic focus
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
              type={isPasswordVisible ? "text" : "password"}
              name={field.attribute}
              value={formik.values[field.attribute] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field.placeholder || "Enter your password"}
              className={`form-control ${hasError ? "is-invalid" : ""}`}
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
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    setTouched: PropTypes.func.isRequired,
  }).isRequired,

  field: PropTypes.shape({
    fieldType: PropTypes.string.isRequired,
    type: PropTypes.string,
    attribute: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    autofocus: PropTypes.bool, // Ensure autofocus is recognized
  }).isRequired,

  index: PropTypes.number,
};

export default GetInputComponent;
