import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const GoToHomeButton = () => {
  const navigate = useNavigate();

  const handleNavBtn = () => {
    navigate("/"); 
  };

  return (
    <Button color="primary" onClick={handleNavBtn}>
      Go to Home
    </Button>
  );
};

export default GoToHomeButton;
