import { useFormik } from "formik";
import FormInputsComponent from "../../components/FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import CancelSaveButtons from "../../components/FormInputs/CancelSaveButtons";
import { generateValidationForm } from "../../utils/validationForm";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig"; // Firestore DB
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const schema = useMemo(() => getCreateAccountSchema(), []);
  const navigation = useNavigate()
  const validationSchema = generateValidationForm(schema);

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Register user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log("User registered:", userCredential.user);

        // Save additional user data to Firestore under the user's UID
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          userName: values.userName,
          password:values.password
        });

        // Optionally, you can send a confirmation email
        // await userCredential.user.sendEmailVerification();

        // Reset the form after successful submission

        formik.resetForm();
        navigation("/sign-in")
      } catch (error) {
        console.error("Error registering user:", error);
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
              <div>Welcome and thank you for registering here</div>
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
    </Container>
  );
};

export default CreateAccount;
