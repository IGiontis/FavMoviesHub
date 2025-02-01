import PropTypes from "prop-types";
import { Col, Form, Row } from "reactstrap";
import { GetInputComponent } from "./GetInputComponent";

const FormInputsComponent = ({ formik, schema, leftCol = 6, rightCol = 6 }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
        return false;
      }}
    >
      {schema.fields.map((field, index) => {
        const isLastRow = index === schema.fields.length - 1;
        return (
          <Row key={index} className={`${isLastRow ? "mb-0" : "mb-3"}`}>
            <Col xs={leftCol} className={`${leftCol === "12" || leftCol === 12 ? "mb-2" : ""}`}>
              <div>{field.label}</div>
            </Col>

            <Col xs={rightCol}>{formik && <GetInputComponent formik={formik} field={field} index={index} />}</Col>
          </Row>
        );
      })}
    </Form>
  );
};

FormInputsComponent.propTypes = {
  formik: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  flexDirection: PropTypes.oneOf(["row", "column"]), // Accepts only "row" or "column"
  leftCol: PropTypes.number, // Optional, defaults to 6 (for 50% width)
  rightCol: PropTypes.number, // Optional, defaults to 6 (for 50% width)
};

export default FormInputsComponent;
