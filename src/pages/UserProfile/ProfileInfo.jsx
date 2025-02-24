import { useSelector } from "react-redux";
import { Col, Container, Label, Row } from "reactstrap";
import getPersonalInfoViewSchema from "./schema/personalInfoViewSchema";


const ProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const schema = getPersonalInfoViewSchema(user);

  console.log(user)
  console.log(schema);
  return (
    <Container fluid className="pt-4 profile-container">
      {schema.fields.map((field, index) => (
        <Row key={index}>
          <Col>
            <Label>{field.label}</Label>
          </Col>
          <Col>
            <Label>{field?.value}</Label>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileInfo;
