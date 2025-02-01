import { useFormik } from "formik";
import FormInputsComponent from "../FormInputs/FormInputsComponent";
import { useMemo } from "react";
import getCreateAccountSchema from "./schema/createAccountSchema";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import CancelSaveButtons from "../FormInputs/CancelSaveButtons";

const CreateAccount = () => {
  const schema = useMemo(() => getCreateAccountSchema(), []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSave = () => {
    formik.handleSubmit();
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
              <div>Welcome and thank you register here</div>
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
