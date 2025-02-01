import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div>
      PageNotFound
      <button type="button" onClick={handleGoHome} className="btn btn-primary">
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
