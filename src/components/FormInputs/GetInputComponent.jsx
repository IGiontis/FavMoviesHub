import PropTypes from "prop-types";
import { Input } from "reactstrap";

// Define the propTypes for the GetInputComponent
export const GetInputComponent = ({ formik, field, index }) => {
  switch (field.fieldType) {
    case "textfield":
      return (
        <div className="form-group">
          <Input
            type={field.type || "text"} // Default to "text" if no type is specified
            className={
              "form-control" + (formik.errors[field.attribute] && formik.touched[field.attribute] ? " is-invalid" : "")
            } // Optional: Add invalid class if there are errors
            name={field.attribute} // This should be the key that matches Formik's field name
            value={formik.values[field.attribute] || ""} // Get the value from Formik's state
            onChange={formik.handleChange} // Handle change using Formik's handleChange
            onBlur={formik.handleBlur} // Handle blur using Formik's handleBlur
            placeholder={field.placeholder || ""} // Add placeholder if needed
          />
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
    fieldType: PropTypes.string.isRequired, // fieldType (e.g., "textfield")
    type: PropTypes.string, // type of the input (e.g., "text", "email")
    attribute: PropTypes.string.isRequired, // key to use in formik.values, formik.errors, etc.
    placeholder: PropTypes.string, // Placeholder for the input field
  }).isRequired,

  index: PropTypes.number, // Optional: index (if needed for dynamic lists)
};
