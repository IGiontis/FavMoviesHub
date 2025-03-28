import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TranslatedText = ({ text, ns = "translation" }) => {
  const { t } = useTranslation(ns);
  return <>{t(text)}</>;
};

TranslatedText.propTypes = {
  text: PropTypes.string.isRequired,
  ns: PropTypes.string,
};

export default TranslatedText;
