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
  let email = values.email;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(values.email)) {
    // Look up username in the database
    const userNameRef = doc(db, "usernames", values.email);
    const userNameSnap = await getDoc(userNameRef);

    if (userNameSnap.exists()) {
      const userId = userNameSnap.data().userId;

      // Retrieve email from users collection
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

    console.log(userCredential.user)
    if (responseData.exists()) {
      // Dispatch user details, including UID, to Redux store
      dispatch(
        setUser({
          uid: userCredential.user.uid, // Adding UID here
          ...responseData.data(), // You can add other user details here as needed
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

  try {
    const userNameRef = doc(db, "usernames", values.userName);
    const userNameSnap = await getDoc(userNameRef);

    if (userNameSnap.exists()) {
      showToast(toastID, "This username is already taken. Please choose a different one.", "error");
      return;
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

    // Save user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      password: values.password,
    });

    // Store username to ensure uniqueness
    await setDoc(doc(db, "usernames", values.userName), {
      userId: userCredential.user.uid,
    });

    showToast(toastID, "Registration successful! Redirecting to login...", "success");

    formik.resetForm();
    toggleModal();
  } catch (error) {
    let errorMessage = "An error occurred during registration.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already in use. Please use a different email.";
    }
    showToast(toastID, errorMessage, "error");
  }
};
