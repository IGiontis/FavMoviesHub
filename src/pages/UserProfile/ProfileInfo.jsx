import { useSelector } from "react-redux";
import { Col, Container, Label, Row } from "reactstrap";
import getPersonalInfoViewSchema from "./schema/personalInfoViewSchema";
import valueOrDashUtil from "../../utils/valueOrDashUtil";
import TranslatedText from "../../components/Language/TranslatedText";

const ProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return null;
  const schema = getPersonalInfoViewSchema(user);

  return (
    <Container fluid className="pt-4">
      {schema.fields.map((field, index) => (
        <Row key={index}>
          <Col>
            <TranslatedText text={field.label} ns="profile" />
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
