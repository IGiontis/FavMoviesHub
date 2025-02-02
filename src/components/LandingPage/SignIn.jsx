import { useFormik } from "formik";
import FormInputsComponent from "../FormInputs/FormInputsComponent";
import { useMemo } from "react";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import CancelSaveButtons from "../FormInputs/CancelSaveButtons";
import getSignInSchema from "./schema/signInSchema";
import { generateValidationForm } from "../../utils/validationForm";

const SignIn = () => {
  const schema = useMemo(() => getSignInSchema(), []);
  const validationSchema = generateValidationForm(schema);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
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
    </Container>
  );
};

export default SignIn;
