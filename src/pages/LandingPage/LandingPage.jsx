import { useState, useCallback, useMemo } from "react";
import { Col, Row, Container, Spinner } from "reactstrap";
import MoviesGallery from "./MoviesGallery";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";
import { toast } from "react-toastify";
import SearchInput from "../../components/FormInputs/SearchInput";
import TranslatedText from "../../components/Language/TranslatedText";
import { t } from "i18next";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use useMemo to avoid unnecessary calculations
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Avoid API calls unless necessary (empty search should not fetch)
  const shouldFetchMovies = useMemo(() => debouncedSearchTerm.trim().length >= 3, [debouncedSearchTerm]);
  const { data: movies = [], isLoading, error } = useMovies(shouldFetchMovies ? debouncedSearchTerm : "");

  // Throttle invalid input check
  const [lastToastTime, setLastToastTime] = useState(0);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e) => {
      const input = e.target.value;

      // Regex to allow only English letters, numbers, and basic punctuation
      const regex = /^[A-Za-z0-9 .,?!]*$/;
      const currentTime = Date.now();

      if (regex.test(input)) {
        setSearchTerm(input);
      } else {
        // If the toast has been shown less than 8 seconds ago, don't show it again
        if (currentTime - lastToastTime > 8000) {
          toast.error(t("searchAMovieInEnglish", { ns: "home" }));
          setLastToastTime(currentTime); // Update lastToastTime to avoid showing it again too soon
        }
      }
    },
    [lastToastTime]
  );

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <h2 className="text-center">
            <TranslatedText text="welcomeTo" ns="home" /> Fav Movies Share
          </h2>
          <div className="mb-4 mt-3 text-center">
            <SearchInput
              ID="search-input"
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange} // Call the new handleSearchChange
              clearSearch={clearSearch}
              placeholder={t("searchAMovie", { ns: "home" })}
            />
          </div>

          {isLoading && (
            <div className="text-center">
              <p>Loading...</p>
              <Spinner />
            </div>
          )}

          {error && <p className="text-danger">Error loading movies.</p>}

          {!isLoading && !error && movies.length > 0 && (
            <MoviesGallery filteredMovies={movies} colSizes={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4, xxl: 3 }} />
          )}

          {!isLoading && !error && movies.length === 0 && shouldFetchMovies && (
            <p className="text-muted text-center">No movies found 😞</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
