import { useState } from "react";
import { useFormik } from "formik";
import FormInputsComponent from "../../components/FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getSignInSchema from "./schema/signInSchema";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import CancelSaveButtons from "../../components/FormInputs/CancelSaveButtons";
import { generateValidationForm } from "../../utils/validationForm";
import { auth } from "../../firebase/firebaseConfig"; // Firebase Authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig"; // Firestore DB
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const schema = useMemo(() => getSignInSchema(), []);
  const validationSchema = generateValidationForm(schema);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Sign in the user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

        console.log("User signed in:", userCredential.user);

        // Fetch user data from Firestore using UID
        const userRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          dispatch(setUser(docSnap.data()));
          setUserData(docSnap.data()); // Set user data after successful retrieval
        } else {
          console.log("No such document!");
        }

        // Reset error in case of successful login
        setError(null);
        navigate("/");
      } catch (err) {
        console.error("Error signing in:", err);
        setError("Invalid credentials or user does not exist.");
      }
    },
  });

  const handleSave = () => {
    const errors = formik.validateForm();
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ maxWidth: "600px" }}>
            <CardHeader>
              <div>Sign In</div>
            </CardHeader>
            <CardBody>
              <FormInputsComponent formik={formik} schema={schema} leftCol={12} rightCol={12} />
            </CardBody>

            <CardFooter>
              <CancelSaveButtons onSave={handleSave} onCancel={handleCancel} />
            </CardFooter>
          </Card>
        </Col>
      </Row>

      {/* Show error message if any */}
      {error && <p className="text-danger">{error}</p>}

      {/* Display user data if the user is signed in */}
      {userData && (
        <div className="mt-3">
          <h3>Welcome, {userData.firstName}!</h3>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phoneNumber}</p>
          <p>Username: {userData.userName}</p>
        </div>
      )}
    </Container>
  );
};

export default SignIn;
