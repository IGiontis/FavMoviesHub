import { useFormik } from "formik";
import FormInputsComponent from "../../components/FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import CancelSaveButtons from "../../components/FormInputs/CancelSaveButtons";
import { generateValidationForm } from "../../utils/validationForm";
import { createNewAccount } from "./services/signInCreateNewServices";

import HeaderCloseBtn from "../../components/FormInputs/HeaderCloseBtn";
import PropTypes from "prop-types";

const CreateAccount = ({ toggleModal }) => {
  const schema = useMemo(() => getCreateAccountSchema(), []);

  const validationSchema = generateValidationForm(schema);

  const formik = useFormik({
    initialValues: {
      username: "", // Consistent key with form field
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createNewAccount(values, formik, toggleModal);
    },
  });

  const handleSave = () => {
    // Trigger the form submission (formik will handle validation automatically)
    formik.handleSubmit();
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    toggleModal();
  };

  return (
    <Card style={{ maxWidth: "600px" }}>
      <CardHeader>
        <HeaderCloseBtn title="Create New Account" onClose={handleCancel} />
      </CardHeader>
      <CardBody>
        <FormInputsComponent formik={formik} schema={schema} leftCol={12} rightCol={12} />
      </CardBody>

      <CardFooter>
        <CancelSaveButtons onSave={handleSave} onCancel={handleCancel} />
      </CardFooter>
    </Card>
  );
};

CreateAccount.propTypes = {
  toggleModal: PropTypes.func,
};

export default CreateAccount;
