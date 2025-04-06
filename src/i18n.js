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

import enCommentsModal from "./locales/en/commentsModal.json";
import grCommentsModal from "./locales/gr/commentsModal.json";

import enAbout from "./locales/en/about.json";
import grAbout from "./locales/gr/about.json";

import enProfile from "./locales/en/profile.json";
import grProfile from "./locales/gr/profile.json";

import enSignInRegister from "./locales/en/signInRegister.json";
import grSignInRegister from "./locales/gr/signInRegister.json";

import enTermsOfUse from "./locales/en/termsOfUse.json";
import grTermsOfUse from "./locales/gr/termsOfUse.json";

import enPrivacyPolicy from "./locales/en/privacyPolicy.json";
import grPrivacyPolicy from "./locales/gr/privacyPolicy.json";

import enMonths from "./locales/en/months.json";
import grMonths from "./locales/gr/months.json";

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
    commentsModal: enCommentsModal,
    about: enAbout,
    profile: enProfile,
    signInRegister: enSignInRegister,
    termOfUse: enTermsOfUse,
    privacyPolicy: enPrivacyPolicy,
    months: enMonths,
    // common: enCommon, // Add other namespaces as needed
  },
  gr: {
    nav: grNav,
    friendsPopup: grFriendsPopup,
    friendsTab: grFriendsTabs,
    home: grHome,
    movie: grMovie,
    commentsModal: grCommentsModal,
    about: grAbout,
    profile: grProfile,
    signInRegister: grSignInRegister,
    termOfUse: grTermsOfUse,
    privacyPolicy: grPrivacyPolicy,
    months: grMonths,
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
