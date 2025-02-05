import { useMemo } from "react";
import { useFormik } from "formik";
import { ToastContainer, Zoom } from "react-toastify";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

import { useDispatch } from "react-redux";

import FormInputsComponent from "../../components/FormInputs/FormInputsComponent";
import CancelSaveButtons from "../../components/FormInputs/CancelSaveButtons";
import getSignInSchema from "./schema/signInSchema";
import { generateValidationForm } from "../../utils/validationForm";

import { signInHandler } from "./services/signInCreateNewServices";
import HeaderCloseBtn from "../../components/FormInputs/HeaderCloseBtn";
import PropTypes from "prop-types";

const SignIn = ({ toggleModal }) => {
  const dispatch = useDispatch();

  const schema = useMemo(() => getSignInSchema(), []);
  const validationSchema = generateValidationForm(schema);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await signInHandler(values, dispatch, toggleModal);
    },
  });

  const handleSave = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      } else {
        console.log("Validation errors:", errors);
      }
    });
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <Card style={{ maxWidth: "600px" }}>
        <CardHeader>
          <HeaderCloseBtn title="Sign In" onClose={toggleModal} />
        </CardHeader>
        <CardBody>
          <FormInputsComponent formik={formik} schema={schema} leftCol={12} rightCol={12} />
        </CardBody>

        <CardFooter>
          <CancelSaveButtons onSave={handleSave} onCancel={handleCancel} />
        </CardFooter>
      </Card>
    </>
  );
};

SignIn.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default SignIn;
