import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        toggle_theme: "Toggle Dark Mode",
        Name: "Name",
        Department: "Department",
        Localnr: "Localnr",
        Landline: "Landline No.",
        Mobile: "Mobile No.",
        Actions: "Actions"
      },
    },
    dk: {
      translation: {
        toggle_theme: "Skift mørk tilstand",
        Name: "Navn",
        Department: "Afdeling",
        Localnr: "Lokalnr",
        Landline: "Fastnet nr.",
        Mobile: "Mobil nr.",
        Actions: "Handlinger"
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;