import PropTypes from "prop-types";
import { Col, Form, FormGroup } from "reactstrap";
import { GetInputComponent } from "./GetInputComponent";

const FormInputsComponent = ({ formik, schema, leftCol = 6, rightCol = 6 }) => {
  console.log(schema);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
        return false;
      }}
    >
      {schema.fields.map((field, index) => {
        return (
          <FormGroup key={`fieldGroup_${index}`} row className="d-flex align-items-center">
            {field?.label && <Col md={leftCol}>{field.label}</Col>}
            <Col md={rightCol} className="justify-content-center align-self-center ">
              {formik && <GetInputComponent formik={formik} field={field} index={index} />}
            </Col>
          </FormGroup>
        );
      })}
    </Form>
  );
};

FormInputsComponent.propTypes = {
  formik: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  leftCol: PropTypes.number,
  rightCol: PropTypes.number,
};

export default FormInputsComponent;
