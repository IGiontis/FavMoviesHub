import { Container, Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import GoToHomeButton from "../components/Buttons/GoToHomeButton";

import TranslatedText from "../components/Language/TranslatedText";
import LastUpdatedDate from "../components/LastUpdatedDate";

const TermsOfUse = () => {
  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">
            <TranslatedText text="termsOfUse" ns="termOfUse" />
          </CardTitle>
          <LastUpdatedDate />
          <p>
            <TranslatedText text="welcome" ns="termOfUse" />
          </p>
          <h4>
            <TranslatedText text="section1Title" ns="termOfUse" />
          </h4>
          <p>
            <TranslatedText text="section1" ns="termOfUse" />
          </p>
          <h4>
            <TranslatedText text="section2Title" ns="termOfUse" />
          </h4>
          <p>
            <TranslatedText text="section2" ns="termOfUse" />
          </p>
          <h4>
            <TranslatedText text="section3Tittle" ns="termOfUse" />
          </h4>
          <p>
            <TranslatedText text="section3" ns="termOfUse" />
          </p>
          <h4>
            {" "}
            <TranslatedText text="section4Title" ns="termOfUse" />
          </h4>
          <p>
            <TranslatedText text="section4" ns="termOfUse" />
          </p>
        </CardBody>
        <CardFooter className="d-flex justify-content-end">
          <GoToHomeButton />
        </CardFooter>
      </Card>
    </Container>
  );
};

export default TermsOfUse;
