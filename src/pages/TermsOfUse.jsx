import { Container, Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import GoToHomeButton from "../components/Buttons/GoToHomeButton";
import { getLastUpdateDate } from "../utils/getLastUpdateDate";

const TermsOfUse = () => {
  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">Όροι Χρήσης</CardTitle>
         <p>Τελευταία ενημέρωση: {getLastUpdateDate()}</p>
          <p>
            Καλώς ήρθατε στον ιστότοπό μας. Με την πρόσβαση και χρήση αυτού του ιστότοπου, αποδέχεστε τους παρακάτω
            όρους χρήσης. Αν δεν συμφωνείτε, παρακαλώ μην χρησιμοποιείτε την υπηρεσία μας.
          </p>
          <h4>1. Χρήση της Υπηρεσίας</h4>
          <p>
            Ο ιστότοπος παρέχεται για προσωπική και μη εμπορική χρήση. Δεν επιτρέπεται η αναπαραγωγή, διανομή ή
            τροποποίηση του περιεχομένου χωρίς άδεια.
          </p>
          <h4>2. Λογαριασμοί Χρηστών</h4>
          <p>
            Εάν δημιουργήσετε λογαριασμό, είστε υπεύθυνοι για την τήρηση της ασφάλειας των προσωπικών σας δεδομένων.
          </p>
          <h4>3. Περιορισμός Ευθύνης</h4>
          <p>
            Δεν φέρουμε καμία ευθύνη για τυχόν απώλειες ή ζημιές που προκύπτουν από τη χρήση αυτού του ιστότοπου.
          </p>
          <h4>4. Χρήση API OMDB</h4>
          <p>
            Ο ιστότοπος χρησιμοποιεί την API του OMDB για την ανάκτηση πληροφοριών ταινιών. Δεν φέρουμε ευθύνη για την ακρίβεια των δεδομένων που παρέχονται από τρίτους παρόχους.
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
