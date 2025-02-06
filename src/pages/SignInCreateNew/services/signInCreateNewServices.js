import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, Zoom } from "react-toastify";
import { auth, db } from "../../../firebase/firebaseConfig";
import { setUser } from "../../../redux/authSlice";

const showToast = (toastID, message, type = "info") => {
  toast.update(toastID, {
    render: message,
    type,
    isLoading: false,
    autoClose: 4000,
    closeOnClick: true,
    position: "top-right",
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Zoom,
  });
};

export const signInHandler = async (values, dispatch, toggleModal) => {
  const toastID = toast.loading("Please wait...");
  let email = values.usernameEmail;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(values.usernameEmail)) {
    const userNameRef = doc(db, "usernames", values.usernameEmail); // Now using the correct key, values.email for the username
    const userNameSnap = await getDoc(userNameRef);

    if (userNameSnap.exists()) {
      const userId = userNameSnap.data().userId;

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        email = userSnap.data().email;
      } else {
        showToast(toastID, "No user found for this username.", "error");
        return;
      }
    } else {
      showToast(toastID, "Username not found.", "error");
      return;
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, values.password);
    const userRef = doc(db, "users", userCredential.user.uid);
    const responseData = await getDoc(userRef);

    if (responseData.exists()) {
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          ...responseData.data(),
        })
      );
    }

    showToast(toastID, "Login successful!", "success");
    toggleModal();
  } catch (err) {
    let errorMessage = "An error occurred during sign-in.";
    if (err.code === "auth/user-not-found") errorMessage = "No user found with this email.";
    if (err.code === "auth/wrong-password") errorMessage = "Incorrect password.";

    showToast(toastID, errorMessage, "error");
  }
};

export const createNewAccount = async (values, formik, toggleModal) => {
  const toastID = toast.loading("Please wait...");
  console.log("enters");

  try {
    console.log("enters2");
    console.log("Username:", values.username); // Fix key here

    // Ensure the username does not exist
    const userNameRef = doc(db, "usernames", values.username); // Corrected key to `username`
    const userNameSnap = await getDoc(userNameRef);

    console.log("enters3");
    if (userNameSnap.exists()) {
      console.log("enters exist");
      showToast(toastID, "This username is already taken. Please choose a different one.", "error");
      return;
    }

    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    console.log("enters4");

    // Create user document in Firestore with userCredential.uid
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      userName: values.username, // Corrected to match the form's field name
      // Avoid storing password in Firestore for security reasons
    });

    // Store the username in a separate collection to ensure its uniqueness
    await setDoc(doc(db, "usernames", values.username), {
      userId: userCredential.user.uid,
    });

    showToast(toastID, "Registration successful! Redirecting to login...", "success");

    formik.resetForm();
    toggleModal();
  } catch (error) {
    console.error("Error during account creation:", error); // Log the full error for debugging
    let errorMessage = "An error occurred during registration.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already in use. Please use a different email.";
    }
    showToast(toastID, errorMessage, "error");
  }
};
