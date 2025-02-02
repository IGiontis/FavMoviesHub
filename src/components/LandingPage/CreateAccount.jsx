import { useFormik } from "formik";
import FormInputsComponent from "../FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import CancelSaveButtons from "../FormInputs/CancelSaveButtons";
import { generateValidationForm } from "../../utils/validationForm";

const CreateAccount = () => {
  const schema = useMemo(() => getCreateAccountSchema(), []);
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
    onSubmit: (values) => {
      console.log("Form submitted:", values);
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
