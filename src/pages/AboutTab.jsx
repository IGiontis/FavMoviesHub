import { Col, Container, Row } from "reactstrap";

const AboutTab = () => {
  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <div className="mb-4">
            <label className="fw-bold fs-4">Καλώς ήρθατε στο Fav Movies Share 🎬</label>
            <p>
              Μια εφαρμογή που σας επιτρέπει να ανακαλύψετε ταινίες, να τις αποθηκεύσετε στα αγαπημένα σας και να
              συνδεθείτε με φίλους για να μοιραστείτε τις προτιμήσεις σας!
            </p>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">🔍 Τι μπορείτε να κάνετε;</label>
            <ul>
              <li>
                <span className="fw-semibold">Αναζήτηση ταινιών:</span> Βρείτε πληροφορίες για τις αγαπημένες σας ταινίες εύκολα μέσω του API, χωρίς να απαιτείται λογαριασμός.
              </li>
              <li>
                <span className="fw-semibold">Δημιουργία λογαριασμού:</span> Εγγραφείτε για να αποκτήσετε επιπλέον δυνατότητες!
              </li>
              <li>
                <span className="fw-semibold">Αποθήκευση αγαπημένων:</span> Κρατήστε μια λίστα με τις αγαπημένες σας ταινίες.
              </li>
              <li>
                <span className="fw-semibold">Αξιολόγηση ταινιών:</span> Αφήστε κριτικές και δώστε βαθμολογίες στις ταινίες που έχετε δει.
              </li>
              <li>
                <span className="fw-semibold">Σχόλια:</span> Συζητήστε για τις ταινίες αφήνοντας σχόλια.
              </li>
              <li>
                <span className="fw-semibold">Κοινωνική διάδραση:</span> Προσθέστε φίλους, δείτε τις αγαπημένες τους ταινίες, τις βαθμολογίες και τα σχόλιά τους.
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">🛠 Τεχνολογίες που χρησιμοποιήθηκαν</label>
            <ul>
              <li>
                <span className="fw-semibold">Frontend:</span> React.js, React Router DOM, Reactstrap, Redux Toolkit, React Query (useQuery, useMutation), CSS Modules, Bootstrap 5, CSS3
              </li>
              <li>
                <span className="fw-semibold">Backend & Authentication:</span> Firebase για database, authentication και real-time δεδομένα
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">🎯 Στόχος του Project</label>
            <p>
              Αυτό το project δημιουργήθηκε ως showcase των δεξιοτήτων μου στην ανάπτυξη σύγχρονων web εφαρμογών με
              React και Firebase. Στόχος μου είναι να κατασκευάζω λειτουργικές, διαδραστικές και καλοσχεδιασμένες
              εφαρμογές που προσφέρουν μια μοναδική εμπειρία χρήστη.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutTab;
