import PropTypes from "prop-types";
import { Input } from "reactstrap";

const SearchInput = ({ ID, searchTerm, handleSearchChange, clearSearch, placeholder = "Type movie name..." }) => {
  return (
    <div className="search-form">
      <Input
        type="text"
        id={ID}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {searchTerm && (
        <span onClick={clearSearch} className="clear-search">
          ✖
        </span>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  ID: PropTypes.string.ID,
  handleSearchChange: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
