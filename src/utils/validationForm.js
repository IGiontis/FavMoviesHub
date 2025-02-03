import * as Yup from "yup";

export const generateValidationForm = (formSchema) => {
  const validationSchema = {};

  formSchema.fields.forEach((field) => {
    let validation = Yup.string();

    // Start defining validation for each field based on its type
    switch (field.fieldType) {
      case "number":
        validation = Yup.number().typeError("Must be a number");
        break;
      case "email":
        validation = Yup.string()
          .email("Invalid email address")
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email format");
        break;
      case "password":
        validation = Yup.string().min(8, "Password must be at least 8 characters").required("Password is required");
        validation = Yup.string().required("Confirm Password is required");
        if (field.validation?.matchWith) {
          validation = validation.oneOf([Yup.ref(field.validation.matchWith), null], "Passwords must match");
        }
        break;
    }

    // Apply required validation if 'is_not_null' is set
    if (field.validation?.is_not_null) {
      validation = validation.required(`${field.label} is required`);
    }

    // Add the validation to the schema for the current field attribute
    validationSchema[field.attribute] = validation;
  });

  // Return the validation schema object
  return Yup.object(validationSchema);
};
