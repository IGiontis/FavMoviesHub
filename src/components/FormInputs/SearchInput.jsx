import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { useTranslation } from 'react-i18next';  // Import useTranslation
import styles from "./searchInput.module.css";

const SearchInput = ({ ID, searchTerm, handleSearchChange, clearSearch, placeholderKey, ns }) => {
  const { t } = useTranslation(ns);  // Get the translation function for the given namespace

  // Translate the placeholder using the provided key
  const placeholder = t(placeholderKey);

  return (
    <div className={styles.searchForm}>
      <Input
        type="text"
        id={ID}
        className={styles.inputField}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <span onClick={clearSearch} className={styles.clearSearch}>
          ✖
        </span>
      )}
      <div className={styles.glowBorder}></div> {/* This is the spark effect */}
    </div>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  ID: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  placeholderKey: PropTypes.string.isRequired,  // The key for the placeholder
  ns: PropTypes.string.isRequired,  // The namespace for translation
};

export default SearchInput;
