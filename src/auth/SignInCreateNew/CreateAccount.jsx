import { useFormik } from "formik";
import FormInputsComponent from "@/components/FormInputs/FormInputsComponent";
import { useCallback, useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import CancelSaveButtons from "@/components/FormInputs/CancelSaveButtons";
import { generateValidationForm } from "@/utils/validationForm";
import { createNewAccount } from "@/services/signInCreateNewServices";

import HeaderCloseBtn from "@/components/FormInputs/HeaderCloseBtn";
import PropTypes from "prop-types";

const CreateAccount = ({ toggleModal, openSignIn }) => {
  const schema = useMemo(() => getCreateAccountSchema(), []);
  const validationSchema = useMemo(() => generateValidationForm(schema), [schema]);

  const handleSuccess = useCallback(() => {
    toggleModal();
    openSignIn();
  }, [toggleModal, openSignIn]);

  const handleCreateAccount = useCallback(
    async (values, formik) => {
      try {
        await createNewAccount(values, formik, handleSuccess);
      } catch (error) {
        console.error("Account creation failed:", error);
      }
    },
    [handleSuccess]
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await handleCreateAccount(values, formik);
      } catch (err) {
        console.error("Error during account creation:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCancel = useCallback(() => {
    if (!formik.isSubmitting) {
      toggleModal();
    }
  }, [toggleModal, formik.isSubmitting]);

  return (
    <Card style={{ maxWidth: "600px" }}>
      <CardHeader>
        <HeaderCloseBtn title="Create New Account" onClose={handleCancel} />
      </CardHeader>
      <CardBody>
        <FormInputsComponent formik={formik} schema={schema} leftCol={12} rightCol={12} />
        <p className="mb-0 mt-3">
          <strong>
            * You can log in using your <span className="text-primary">Username</span> or{" "}
            <span className="text-primary">Email</span> along with your <span className="text-primary">Password</span>.
          </strong>
        </p>
      </CardBody>

      <CardFooter>
        <CancelSaveButtons onSave={formik.handleSubmit} onCancel={handleCancel} disabled={formik.isSubmitting} />
      </CardFooter>
    </Card>
  );
};

CreateAccount.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  openSignIn: PropTypes.func.isRequired,
};

export default CreateAccount;
