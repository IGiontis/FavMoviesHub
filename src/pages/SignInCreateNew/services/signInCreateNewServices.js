import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast, Zoom } from "react-toastify";
import { auth, db } from "../../../firebase/firebaseConfig";
import { setUser } from "../../../redux/authSlice";

export const signInHandler = async (values, dispatch, toggleModal) => {
  const toastID = toast.loading("Please wait..."); // Initial loading toast
  try {
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    const userRef = doc(db, "users", userCredential.user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      dispatch(setUser(docSnap.data()));
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
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // Error toast
    toast.update(toastID, {
      render: "Your email and password don't match.", // Error message
      type: "error",
      isLoading: false,
      autoClose: 4000,
      closeOnClick: true,
      position: "top-right",
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Zoom, // Transition effect
    });
  }
};
