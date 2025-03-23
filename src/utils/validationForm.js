import * as Yup from "yup";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Utility function to debounce async validation to reduce Firestore calls
const debounceAsyncValidation = (func, delay = 400) => {
  let timer;
  return (...args) =>
    new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        resolve(await func(...args));
      }, delay);
    });
};

// Asynchronous function to check if the username exists (case insensitive)
const checkUsernameExists = debounceAsyncValidation(async (username) => {
  if (!username) return true;

  try {
    const normalizedUsername = username.toLowerCase();
    const userNameRef = doc(db, "usernames", normalizedUsername);
    const userNameSnap = await getDoc(userNameRef);
    return !userNameSnap.exists(); // Return `true` if the username does NOT exist
  } catch (error) {
    console.error("Error checking username:", error);
    return false; // Assume taken if an error occurs
  }
});

// Asynchronous function to check if the email exists (case insensitive)
const checkEmailExists = debounceAsyncValidation(async (email) => {
  if (!email) return true;

  try {
    const normalizedEmail = email.toLowerCase();
    const userEmailRef = query(collection(db, "users"), where("email", "==", normalizedEmail));
    const userEmailSnap = await getDocs(userEmailRef);

    return userEmailSnap.empty; // Return `true` if the email does NOT exist
  } catch (error) {
    console.error("Error checking email:", error);
    return false; // Assume taken if an error occurs
  }
});

// Generates the validation schema dynamically
export const generateValidationForm = (formSchema) => {
  const validationSchema = {};

  formSchema.fields.forEach((field) => {
    let validation = Yup.string();

    switch (field.fieldType) {
      case "number":
        validation = Yup.number().typeError("Must be a number");
        break;
      case "email":
        validation = Yup.string().email("Invalid email address").lowercase(); // Ensures lowercase consistency
        break;
      case "password":
        if (field.validation?.matchWith) {
          validation = validation.oneOf([Yup.ref(field.validation.matchWith), null], "Passwords must match");
        }
        break;
    }

    // Apply required validation if `is_not_null` is set
    if (field.validation?.is_not_null) {
      validation = validation.required(`${field.label} is required`);
    }

    // Asynchronous validation for username (case insensitive)
    if (field.attribute === "username") {
      validation = validation
        .matches(
          /^[A-Za-z][A-Za-z0-9_-]*$/,
          "Username must start with a letter and can only contain letters, numbers, _ or - . Spaces are not allowed."
        )
        .min(4, "Username must be at least 4 characters long")
        .max(20, "Username cannot be longer than 20 characters")
        .lowercase() // Ensures it's always stored as lowercase
        .test("check-username-existence", "Username already exists", checkUsernameExists);
    }

    // Asynchronous validation for email (case insensitive)
    if (field.attribute === "email") {
      validation = validation
        .lowercase() // Ensures lowercase for consistency
        .test("check-email-existence", "Email already exists", checkEmailExists);
    }

    validationSchema[field.attribute] = validation;
  });

  return Yup.object(validationSchema);
};
