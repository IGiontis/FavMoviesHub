import { Container, Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import GoToHomeButton from "../components/Buttons/GoToHomeButton";

import TranslatedText from "../components/Language/TranslatedText";
import LastUpdatedDate from "../components/LastUpdatedDate";

const PrivacyPolicy = () => {
  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">
            <TranslatedText text="privacyPolicyTitle" ns="privacyPolicy" />
          </CardTitle>
          <LastUpdatedDate />
          <p>
            <TranslatedText text="privacyPolicyInfo" ns="privacyPolicy" />
          </p>
          <h4>
            <TranslatedText text="infoCollectionTitle" ns="privacyPolicy" />
          </h4>
          <p>
            <TranslatedText text="infoCollectionContent" ns="privacyPolicy" />
          </p>
          <h4>
            <TranslatedText text="howWeUseInfoTitle" ns="privacyPolicy" />
          </h4>
          <p>
            <TranslatedText text="howWeUseInfoContent" ns="privacyPolicy" />
          </p>
          <h4>
            <TranslatedText text="dataSecurityTitle" ns="privacyPolicy" />
          </h4>
          <p>
            <TranslatedText text="dataSecurityContent" ns="privacyPolicy" />
          </p>
        </CardBody>
        <CardFooter className="d-flex justify-content-end">
          <GoToHomeButton />
        </CardFooter>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;
