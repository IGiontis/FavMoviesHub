import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const GoToHomeButton = () => {
  const navigate = useNavigate(); // No "navigation", it's "navigate"

  const handleNavBtn = () => {
    navigate("/"); // ✅ Correct way in React Router v6
  };

  return (
    <Button color="primary" onClick={handleNavBtn}>
      Go to Home
    </Button>
  );
};

export default GoToHomeButton;
