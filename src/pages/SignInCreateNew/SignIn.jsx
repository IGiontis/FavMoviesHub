import { useMemo } from "react";
import { useFormik } from "formik";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

import { useDispatch } from "react-redux";

import FormInputsComponent from "../../components/FormInputs/FormInputsComponent";
import CancelSaveButtons from "../../components/FormInputs/CancelSaveButtons";
import getSignInSchema from "./schema/signInSchema";
import { generateValidationForm } from "../../utils/validationForm";

import { signInHandler } from "../../services/signInCreateNewServices";
import HeaderCloseBtn from "../../components/FormInputs/HeaderCloseBtn";
import PropTypes from "prop-types";

const SignIn = ({ toggleModal }) => {
  const dispatch = useDispatch();

  const schema = useMemo(() => getSignInSchema(), []);
  const validationSchema = useMemo(() => generateValidationForm(schema), [schema]);

  const formik = useFormik({
    initialValues: {
      usernameEmail: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await signInHandler(values, dispatch, toggleModal);
      setSubmitting(false);
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

  return (
    <Card style={{ maxWidth: "600px" }}>
      <CardHeader>
        <HeaderCloseBtn title="Sign In" onClose={toggleModal} />
      </CardHeader>
      <CardBody>
        <FormInputsComponent formik={formik} schema={schema} leftCol={12} rightCol={12} />
      </CardBody>

      <CardFooter>
        <CancelSaveButtons
          onSave={handleSave}
          onCancel={toggleModal}
          disabled={formik.isSubmitting} // ✅ Disables buttons instead of removing handlers
        />
      </CardFooter>
    </Card>
  );
};

SignIn.propTypes = {
  toggleModal: PropTypes.func,
};

export default SignIn;
