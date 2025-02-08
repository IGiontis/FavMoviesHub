import { Card, CardBody, CardFooter, CardTitle, Container } from "reactstrap";
import GoToHomeButton from "../components/Buttons/GoToHomeButton";

const PrivacyPolicy = () => {
  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">Πολιτική Απορρήτου</CardTitle>
          <p>Τελευταία ενημέρωση: Φεβρουάριος 2024</p>
          <p>
            Αυτή η πολιτική απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα
            κατά τη χρήση του ιστότοπού μας.
          </p>
          <h4>1. Πληροφορίες που Συλλέγουμε</h4>
          <p>
            Συλλέγουμε πληροφορίες που παρέχετε κατά την εγγραφή σας, όπως όνομα, email και άλλα στοιχεία επικοινωνίας.
          </p>
          <h4>2. Πώς Χρησιμοποιούμε τις Πληροφορίες</h4>
          <p>
            Τα δεδομένα σας χρησιμοποιούνται για τη βελτίωση των υπηρεσιών μας, την επικοινωνία μαζί σας και την ανάλυση
            της χρήσης του ιστότοπου.
          </p>
          <h4>3. Ασφάλεια Δεδομένων</h4>
          <p>
            Λαμβάνουμε μέτρα για την προστασία των προσωπικών σας δεδομένων, αλλά δεν μπορούμε να εγγυηθούμε πλήρη
            ασφάλεια.
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
