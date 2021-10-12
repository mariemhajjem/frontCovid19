import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_FR } from "./fr/translation";
import { TRANSLATIONS_EN } from "./en/translation";
import { TRANSLATIONS_ARAB } from "./arab/translation";

i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     fr: {
       translation: TRANSLATIONS_FR
     },
     arab: {
       translation: TRANSLATIONS_ARAB
     }
   }
 });
 
//i18n.changeLanguage("en");
export default i18n;