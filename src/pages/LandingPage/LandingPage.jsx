import { useState, useCallback, useMemo } from "react";
import { Col, Row, Container } from "reactstrap";
import MoviesGallery from "../../components/MovieCard/MoviesGallery";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";
import SearchInput from "../../components/FormInputs/SearchInput";
import TranslatedText from "../../components/Language/TranslatedText";
import { Skeleton } from "@mui/material";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to restrict input to English characters
  const handleSearchChange = useCallback((e) => {
    const input = e.target.value;

    // Regex to allow only English letters, numbers, basic punctuation, &, and -
    const regex = /^[A-Za-z0-9 .,?!&-]*$/;

    if (regex.test(input)) {
      setSearchTerm(input); // Update search term only if valid
    }
  }, []);

  // Use useMemo to avoid unnecessary calculations
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Avoid API calls unless necessary (empty search should not fetch)
  const shouldFetchMovies = useMemo(() => debouncedSearchTerm.trim().length >= 3, [debouncedSearchTerm]);
  const { data: movies = [], isLoading, error } = useMovies(shouldFetchMovies ? debouncedSearchTerm : "");

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
              handleSearchChange={handleSearchChange}
              clearSearch={clearSearch}
              placeholderKey="searchAMovieInEnglish"
              ns="home"
            />
          </div>

          {isLoading && (
            <Row>
              {[...Array(6)].map((_, index) => (
                <Col key={index} className="mb-4" xs={12} sm={6} md={6} lg={5} xl={4} xxl={3}>
                  <Skeleton variant="rectangular" height={400} />
                </Col>
              ))}
            </Row>
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
