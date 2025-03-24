import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, Zoom } from "react-toastify";
import { auth, db } from "@/firebase/firebaseConfig";
import { setUser } from "@/redux/authSlice";

const showToast = (toastID, message, type = "info", timeAutoClose = 2000) => {
  toast.update(toastID, {
    render: message,
    type,
    isLoading: false,
    autoClose: timeAutoClose,
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
  let email = values.usernameEmail.toLowerCase(); // Convert input to lowercase

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    if (!emailRegex.test(values.usernameEmail)) {
      const usernameRef = doc(db, "usernames", values.usernameEmail.toLowerCase());
      const usernameSnap = await getDoc(usernameRef);

      if (!usernameSnap.exists()) {
        showToast(toastID, "The username or password isn't correct.", "error");
        throw new Error("The username or password isn't correct.");
      }

      const userId = usernameSnap.data().userId;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        showToast(toastID, "The username or password isn't correct.", "error");
        throw new Error("The username or password isn't correct.");
      }

      email = userSnap.data().email; // Email is already stored in lowercase
    }

    // Attempt to sign in with email and password
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
    
    const errorCode = err?.code || err?.message || ""; // Ensure we capture the actual error code

    if (
      errorCode.includes("auth/wrong-password") ||
      errorCode.includes("auth/user-not-found") ||
      errorCode.includes("auth/invalid-credential") 
    ) {
      showToast(toastID, "The username or password isn't correct.", "error", 3000);
      return; 
    }

    // Default fallback for unexpected errors
    showToast(toastID, "No username Or password existing", "error", 3000);
  }
};

export const createNewAccount = async (values, formik, onSuccess) => {
  const toastID = toast.loading("Please wait...");

  try {
    // Convert username and email to lowercase before storing
    const normalizedUsername = values.username.toLowerCase();
    const normalizedEmail = values.email.toLowerCase();

    // Ensure the username does not exist
    const usernameRef = doc(db, "usernames", normalizedUsername);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      showToast(toastID, "This username is already taken. Please choose a different one.", "error");
      return;
    }

    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, values.password);

    // Create user document in Firestore with userCredential.uid
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: normalizedEmail,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      username: normalizedUsername, // Store username in lowercase
    });

    // Store the username in a separate collection to ensure its uniqueness
    await setDoc(doc(db, "usernames", normalizedUsername), {
      userId: userCredential.user.uid,
    });

    showToast(toastID, "Registration successful! Redirecting to login...", "success");

    formik.resetForm();
    onSuccess();
  } catch (error) {
    console.error("Error during account creation:", error);
    let errorMessage = "An error occurred during registration.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "This email is already in use. Please use a different email.";
    }
    showToast(toastID, errorMessage, "error");
  }
};
