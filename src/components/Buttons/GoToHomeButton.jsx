import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import TranslatedText from "../Language/TranslatedText";

const GoToHomeButton = () => {
  const navigate = useNavigate();

  const handleNavBtn = () => {
    navigate("/");
  };

  return (
    <Button color="primary" onClick={handleNavBtn}>
      <TranslatedText text="goToHome" ns="termOfUse" />
    </Button>
  );
};

export default GoToHomeButton;
