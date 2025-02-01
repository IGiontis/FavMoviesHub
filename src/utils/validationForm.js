import * as Yup from "yup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateValidationForm = (formSchema) => {
  const validationSchema = {};

  formSchema.fields.forEach((field) => {
    let validation = Yup.string();

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
        validation = Yup.string()
          .min(8, "Password must be at least 8 characters long")
          .matches(/[a-z]/, "Password must contain at least one lowercase letter")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[@$!%*?&]/, "Password must contain at least one special character");
        break;
    }

    if (field.validation?.is_not_null) {
      validation = validation.required(`${field.label} is required`);
    }

    // Async validation for usernames
    if (field.attribute === "username") {
      validation = validation.test("async-username-validation", "Nice try", async (value) => {
        await sleep(2000);
        return !["admin", "null", "god"].includes(value);
      });
    }

    validationSchema[field.attribute] = validation;
  });

  return Yup.object(validationSchema);
};
