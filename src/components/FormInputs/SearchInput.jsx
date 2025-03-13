import PropTypes from "prop-types";
import { Input } from "reactstrap";
import styles from "./searchInput.module.css";

const SearchInput = ({ ID, searchTerm, handleSearchChange, clearSearch, placeholder = "Type movie name..." }) => {
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
  placeholder: PropTypes.string,
};

export default SearchInput;
