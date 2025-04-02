import { Col, Container, Row } from "reactstrap";
import TranslatedText from "../components/Language/TranslatedText";

const AboutTab = () => {
  return (
    <Container fluid className="pt-4 px-4">
      <Row>
        <Col>
          <div className="mb-4">
            <label className="fw-bold fs-4">
              <TranslatedText text="favMoviesShare" ns="about" />
            </label>
            <p>
              <TranslatedText text="aboutText" ns="about" />
            </p>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">
              <TranslatedText text="whatYouCanDo" ns="about" />
            </label>
            <ul>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="searchMovies" ns="about" />
                </span>{" "}
                <TranslatedText text="searchMoviesDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="createAccount" ns="about" />
                </span>{" "}
                <TranslatedText text="createAccountDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="saveFavorites" ns="about" />
                </span>{" "}
                <TranslatedText text="saveFavoritesDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="rateMovies" ns="about" />
                </span>{" "}
                <TranslatedText text="rateMoviesDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="comments" ns="about" />
                </span>{" "}
                <TranslatedText text="commentsDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="socialInteraction" ns="about" />
                </span>{" "}
                <TranslatedText text="socialInteractionDescription" ns="about" />
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">
              <TranslatedText text="technologiesUsed" ns="about" />
            </label>
            <ul>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="frontend" ns="about" />
                </span>{" "}
                <TranslatedText text="frontendDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="backendAndAuth" ns="about" />
                </span>{" "}
                <TranslatedText text="backendAndAuthDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="movieAPI" ns="about" />
                </span>
                <TranslatedText text="movieAPIDescription" ns="about" />
              </li>

              <li>
                <span className="fw-semibold">
                  <TranslatedText text="hosting" ns="about" />
                </span>{" "}
                <TranslatedText text="hostingDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="multiLanguageSupport" ns="about" />
                </span>{" "}
                <TranslatedText text="multiLanguageSupportDescription" ns="about" />
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">
              <TranslatedText text="projectGoal" ns="about" />
            </label>

            <ul>
              <li>
                <TranslatedText text="projectGoalText" ns="about" />
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="fw-bold fs-5">
              <TranslatedText text="mainFeatures" ns="about" />
            </label>
            <ul>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="searchAndSaveMovies" ns="about" />
                </span>{" "}
                <TranslatedText text="searchAndSaveMoviesDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="socialInteractionOnlyWithFriends" ns="about" />
                </span>{" "}
                <TranslatedText text="socialInteractionOnlyWithFriendsDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="realTimeInteraction" ns="about" />
                </span>{" "}
                <TranslatedText text="realTimeInteractionDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="friendsAndProtectedAccounts" ns="about" />
                </span>{" "}
                <TranslatedText text="friendsAndProtectedAccountsDescription" ns="about" />
              </li>
              <li>
                <span className="fw-semibold">
                  <TranslatedText text="favoriteMoviesWithFriends" ns="about" />
                </span>{" "}
                <TranslatedText text="favoriteMoviesWithFriendsDescription" ns="about" />
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutTab;
