import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        toggle_theme: "Toggle Dark Mode",
        name: "Name",
        department: "Department",
        localnr: "Localnr",
        landline: "Landline No.",
        mobile: "Mobile No.",
        actions: "Actions"
      },
    },
    dk: {
      translation: {
        toggle_theme: "Skift mørk tilstand",
        name: "Navn",
        department: "Afdeling",
        localnr: "Lokalnr",
        landline: "Fastnet nr.",
        mobile: "Mobil nr.",
        actions: "Handlinger"
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