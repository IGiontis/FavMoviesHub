import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import Flag from "react-world-flags";
import { memo, useCallback } from "react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(
    (event) => {
      event.preventDefault();
      const newLang = i18n.language === "en" ? "gr" : "en";
      i18n.changeLanguage(newLang);
    },
    [i18n]
  );

  return (
    <IconButton
      onClick={toggleLanguage}
      color="primary"
      className="px-3"
      aria-label={i18n.language === "en" ? "Switch to Greek" : "Switch to English"}
    >
      {i18n.language === "en" ? (
        <Flag code="GR" style={{ width: 20, height: 15 }} alt="Greek Flag" />
      ) : (
        <Flag code="US" style={{ width: 20, height: 15 }} alt="English Flag" />
      )}
    </IconButton>
  );
};

export default memo(LanguageSwitcher);
