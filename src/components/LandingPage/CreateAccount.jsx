import { useFormik } from "formik";
import FormInputsComponent from "../FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";

const CreateAccount = () => {
  const schema = useMemo(() => getCreateAccountSchema(), []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <FormInputsComponent formik={formik} schema={schema} />
    </div>
  );
};

export default CreateAccount;
