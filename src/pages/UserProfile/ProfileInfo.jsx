import { useSelector } from "react-redux";
import { Col, Container, Label, Row } from "reactstrap";
import getPersonalInfoViewSchema from "./schema/personalInfoViewSchema";
import valueOrDashUtil from "../../utils/valueOrDashUtil";


const ProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const schema = getPersonalInfoViewSchema(user);

  return (
    <Container fluid className="pt-4">
      {schema.fields.map((field, index) => (
        <Row key={index}>
          <Col>
            <Label>{field.label}</Label>
          </Col>
          <Col>
            <Label>{valueOrDashUtil(field?.value)}</Label>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileInfo;
