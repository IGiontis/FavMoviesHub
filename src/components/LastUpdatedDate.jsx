import { format } from "date-fns";
import TranslatedText from "./Language/TranslatedText";

// Custom hook
const LastUpdatedDate = () => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, "MMMM"); // This will give you the full month name (e.g., "April")
  const currentYear = format(currentDate, "yyyy"); // This will give you the current year (e.g., "2025")

  return (
    <div className="d-flex align-items-center mb-2">
      <TranslatedText text="lastUpdate" ns="privacyPolicy" />
      <div className="ms-2">
        <TranslatedText text={currentMonth} ns="months" /> {currentYear}
      </div>
    </div>
  );
};

export default LastUpdatedDate;
