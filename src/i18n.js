import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your JSON files for multiple namespaces
import enNav from "./locales/en/nav.json";
import grNav from "./locales/gr/nav.json";

import enFriendsPopup from "./locales/en/friendsPopup.json";
import grFriendsPopup from "./locales/gr/friendsPopup.json";

import enFriendsTab from "./locales/en/friendsTab.json";
import grFriendsTabs from "./locales/gr/friendsTab.json";

import enHome from "./locales/en/home.json";
import grHome from "./locales/gr/home.json";

import enMovie from "./locales/en/movie.json";
import grMovie from "./locales/gr/movie.json";

// Add other namespaces if necessary
// import enCommon from "./locales/en/common.json";
// import grCommon from "./locales/gr/common.json";

const resources = {
  en: {
    nav: enNav,
    friendsPopup: enFriendsPopup,
    friendsTab: enFriendsTab,
    home: enHome,
    movie: enMovie,
    // common: enCommon, // Add other namespaces as needed
  },
  gr: {
    nav: grNav,
    friendsPopup: grFriendsPopup,
    friendsTab: grFriendsTabs,
    home: grHome,
    movie: grMovie,

    // common: grCommon, // Add other namespaces as needed
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  defaultNS: "nav", // Default namespace
  interpolation: { escapeValue: false },
});

export default i18n;
