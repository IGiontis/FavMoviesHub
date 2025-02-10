import * as Yup from "yup";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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
        if (field.validation?.matchWith) {
          validation = validation.oneOf([Yup.ref(field.validation.matchWith), null], "Passwords must match");
        }
        break;
    }

    // Apply required validation if 'is_not_null' is set
    if (field.validation?.is_not_null) {
      validation = validation.required(`${field.label} is required`);
    }

    // Add asynchronous validation for the username
    if (field.attribute === "username") {
      validation = validation
        .matches(
          /^[A-Za-z][A-Za-z0-9_-]*$/,
          "Username must start with a letter and can only contain letters, numbers, _ or - . Also space is not allowed"
        )
        .max(20, "Username cannot be longer than 20 characters")
        .test("check-username-existence", "Username already exists", async (value) => {
          if (value) {
            const userNameRef = doc(db, "usernames", value);
            const userNameSnap = await getDoc(userNameRef);
            return !userNameSnap.exists();
          }
          return true;
        });
    }

    // Add asynchronous validation for the email to ensure it's unique
    if (field.attribute === "email") {
      validation = validation.test(
        "check-email-existence", // Custom test name
        "Email already exists", // Error message
        async (value) => {
          if (value) {
            // Here we check the `users` collection for the email's existence
            const userEmailRef = query(collection(db, "users"), where("email", "==", value)); // Query for email field
            const userEmailSnap = await getDocs(userEmailRef); // getDocs is used for queries, not getDoc

            console.log("Email validation triggered");
            return userEmailSnap.empty; // Return true if the email does not exist (empty result)
          }
          return true; // If no value is provided, skip this check
        }
      );
    }

    // Add the validation to the schema for the current field attribute
    validationSchema[field.attribute] = validation;
  });

  // Return the validation schema object
  return Yup.object(validationSchema);
};
