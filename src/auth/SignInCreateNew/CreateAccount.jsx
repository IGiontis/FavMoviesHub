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

const CreateAccount = ({ toggleModal }) => {
  const schema = useMemo(() => getCreateAccountSchema(), []);

  const validationSchema = useMemo(() =>generateValidationForm(schema),[schema]);

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
    onSubmit: (values) => handleCreateAccount(values, formik, toggleModal),
  });

  // ✅ Memoizing the function to avoid re-creation on every render
  const handleCreateAccount = useCallback((values, formik, toggleModal) => {
    createNewAccount(values, formik, toggleModal);
  }, []);

  const handleCancel = useCallback(() => {
    console.log("Cancel clicked");
    toggleModal();
  }, [toggleModal]);

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
        <CancelSaveButtons onSave={formik.handleSubmit} onCancel={handleCancel} />
      </CardFooter>
    </Card>
  );
};

CreateAccount.propTypes = {
  toggleModal: PropTypes.func,
};

export default CreateAccount;
