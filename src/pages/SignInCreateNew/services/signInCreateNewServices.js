import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, Zoom } from "react-toastify";
import { auth, db } from "../../../firebase/firebaseConfig";
import { setUser } from "../../../redux/authSlice";

export const signInHandler = async (values, dispatch, toggleModal) => {
  const toastID = toast.loading("Please wait...");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    const userRef = doc(db, "users", userCredential.user.uid);
    const responseData = await getDoc(userRef);

    if (responseData.exists()) {
      dispatch(setUser(responseData.data()));
    } else {
      console.log("No such document!");
    }

    toast.update(toastID, {
      render: "Login successful!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      closeOnClick: true,
      position: "top-right",
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom,
    });

    toggleModal();
  } catch (err) {
    console.error("Sign-in error:", err);
    if (err.code === "auth/user-not-found") {
      toast.update(toastID, {
        render: "No user found with this email.",
        type: "error",
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
    } else if (err.code === "auth/wrong-password") {
      toast.update(toastID, {
        render: "Incorrect password.",
        type: "error",
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
    } else {
      toast.update(toastID, {
        render: "An error occurred during sign-in.",
        type: "error",
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
    }
  }
};

export const createNewAccount = async (values, formik, toggleModal) => {
  const toastID = toast.loading("Please wait...");

  try {
    // Ελέγχουμε αν το userName υπάρχει ήδη στη συλλογή "usernames"
    const userNameRef = doc(db, "usernames", values.userName);
    const userNameSnap = await getDoc(userNameRef);

    console.log('userNameRef',userNameRef)
    console.log('userNameSnap',userNameRef)

    if (userNameSnap.exists()) {
      // Αν το userName υπάρχει ήδη, ειδοποιούμε τον χρήστη
      toast.update(toastID, {
        render: "This username is already taken. Please choose a different username.",
        type: "error",
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
      return; // Σταματάμε την εκτέλεση αν το username υπάρχει ήδη
    }

    // Δημιουργία χρήστη με το email και password (Firebase Authentication)
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    console.log("User registered:", userCredential.user);

    // Αποθήκευση δεδομένων χρήστη στη συλλογή "users"
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      password: values.password,
    });

    // Προσθήκη του userName στη συλλογή "usernames" για να είναι μοναδικό
    await setDoc(doc(db, "usernames", values.userName), {
      userId: userCredential.user.uid, // Σύνδεση του userName με τον userId
    });

    toast.update(toastID, {
      render: "Registration successful! Redirecting to login...",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      closeOnClick: true,
      position: "top-right",
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom,
    });

    formik.resetForm();
    toggleModal();
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "auth/email-already-in-use") {
      toast.update(toastID, {
        render: "This email is already in use. Please use a different email.",
        type: "error",
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
    } else {
      toast.update(toastID, {
        render: "An error occurred during registration.",
        type: "error",
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
    }
  }
};
