import MarriageIcon from "@mui/icons-material/VolunteerActivism";
import BirthIcon from "@mui/icons-material/Cake";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Birth from "../components/pdf-templates/Birth";
import Marriage from "../components/pdf-templates/Marriage";
import Paternity from "../components/pdf-templates/Paternity";
import Divorce from "../components/pdf-templates/Divorce";

export const documentNames = {
  marriage: {
    name: "Ամուսնության Վկայական",
    icon: <MarriageIcon color="primary" />,
    template: Marriage,
  },
  birth: {
    name: "Ծննդյան Վկայական",
    icon: <BirthIcon color="primary" />,
    template: Birth,
  },
  divorce: {
    name: "Ամուսնալուծության Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Divorce,
  },
  death: {
    //TODO Make template Death
    name: "Մահվան Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Paternity,
  },
  adoption: {
    //TODO Make template Adoption
    name: "Որդեգրման վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Paternity,
  },
  paternity: {
    name: "Հայրության ճանաչման Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Paternity,
  },
  chname: {
    //TODO Make template Chname
    name: "Անվանափոխության Վկայական",
    icon: <HeartBrokenIcon color="primary" />,
    template: Paternity,
  },
};

export const qkagDocumentTypes = {
  p: "Անձնագիր",
  id: "Նույնականացման քարտ",
  b: "Ծննդյան վկայական",
  fp: "Արտասահմանյան անձնագիր",
  fb: "Արտասահմանյան ծննդյան վկայական",
  f9: "Ձեւ 9 տեղեկանք",
  f1: "Ձեւ 1 փաստաթուղթ",
  cd: "Կոնվենցիոն ՃՓ",
  tid: "Ժամանակավոր անձը հաստատող փ/թ",
  rc: "Կացության քարտ",
  ic: "Անձը հաստատող վկայական",
  mc: "Զինգրքույկ",
  pr: "Տեղեկանք ԱՎՎ ԱԲ",
  td: "ԱՎՎ ՃՓ",
  cr: "Վերադարձի վկայական",
  bio: "Բիոմետրիկ անձնագիր",
  ref: "Փախստականի վկայական",
  oth: "Այլ",
};

export const deathReasons = {
  1: "Հիվանդությունից",
  2: "Արտադրության հետ չկապված դժբախտ պատահարից",
  3: "Արտադրության հետ կապված դժբախտ պատահարից",
  4: "Սպանությունից",
  5: "Ինքնասպանությունից",
  6: "Մահվան բնույթն անորոշ է",
  7: "Ռազմական իրադարձությունների հետևանքով",
  8: "Ահաբեկչական գործողությունների հետևանքով",
};

export const bprDocumentTypes = {
  ID_CARD: "ID քարտ",
  NON_BIOMETRIC_PASSPORT: "ՀՀ անձնագիր",
  BIOMETRIC_PASSPORT: "Կենսաչափ․ անձնագիր",
  BIRTH_CERTIFICATE: "Ծննդյան․ վկ․",
  TRAVEL_DOCUMENT: "Ճամփորդական փ/թ",
  FOREIGN_PASSPORT: "Օտարերկրյա անձ․",
  RESIDENCE_CARD: "Կացության քարտ",
  OTHER: "Այլ",
};

export const perPageCount = 10;

export const filterDefaultObj = {
  age: {},
  gender: { maleCount: 0, femaleCount: 0 },
  region: {
    yerevan: 0,
    aragatsotn: 0,
    ararat: 0,
    armavir: 0,
    gegharquniq: 0,
    kotayq: 0,
    lori: 0,
    shirak: 0,
    syuniq: 0,
    tavush: 0,
    vayotsDzor: 0,
    other: 0,
  },
};

export const companyDocumentNames = {
  statement: { title: "ՔԱՂՎԱԾՔ", icon: <DescriptionIcon /> },
  charter: { title: "ԿԱՆՈՆԱԴՐՈՒԹՅՈՒՆ", icon: <AccountBalanceIcon /> },
  unknown: { title: "ՓԱՍՏԱԹՈՒՂԹ", icon: <DescriptionIcon /> },
};

export const messages = {
  excelFromFile: {
    uploadSuccess: "Նիշքը հաջողությամբ բեռնվել է",
  },
  excelTable: {
    errorMessage: "Խնդիր է առաջացել",
    noData: "Տվյալներ առկա չեն",
  },
};

export const MOCK_MONTHS = [
  {
    label: "Հունվար",
    value: 1,
    key: "Հունվար",
  },
  {
    label: "Փետրվար",
    value: 2,
    key: "Փետրվար",
  },
  {
    label: "Մարտ",
    value: 3,
    key: "Մարտ",
  },
  {
    label: "Ապրիլ",
    value: 4,
    key: "Ապրիլ",
  },
  {
    label: "Մայիս",
    value: 5,
    key: "Մայիս",
  },
  {
    label: "Հունիս",
    value: 6,
    key: "Հունիս",
  },
  {
    label: "Հուլիս",
    value: 7,
    key: "Հուլիս",
  },
  {
    label: "Օգոստոս",
    value: 8,
    key: "Օգոստոս",
  },
  {
    label: "Սեպտեմբեր",
    value: 9,
    key: "Սեպտեմբեր",
  },
  {
    label: "Հոկտեմբեր",
    value: 10,
    key: "Հոկտեմբեր",
  },
  {
    label: "Նոյեմբեր",
    value: 11,
    key: "Նոյեմբեր",
  },
  {
    label: "Դեկտեմբեր",
    value: 12,
    key: "Դեկտեմբեր",
  },
];

export const MOCK_YEARS = [
  {
    label: "2022",
    value: 2022,
    key: 2022,
  },
  {
    label: "2023",
    value: 2023,
    key: 2023,
  },
  {
    label: "2024",
    value: 2024,
    key: 2024,
  },
];

export const MOCK_PERIODS = [
  {
    label: "1-ին կիսամյակ",
    value: "h1",
    key: "h1",
  },
  {
    label: "2-րդ կիսամյակ",
    value: "h2",
    key: "h2",
  },
  {
    label: "տարեկան",
    value: "annual",
    key: "annual",
  },
  {
    label: "1-ին եռամսյակ",
    value: "q1",
    key: "q1",
  },
  {
    label: "2-րդ եռամսյակ",
    value: "q2",
    key: "q2",
  },
  {
    label: "3-րդ եռամսյակ",
    value: "q3",
    key: "q3",
  },
  {
    label: "4-րդ եռամսյակ",
    value: "q4",
    key: "q4",
  },
  {
    label: "9֊ամսյակ",
    value: "9monthly",
    key: "9monthly",
  },
  {
    label: "ամսական",
    value: "monthly",
    key: "monthly",
  },
];

export const periodsMap = {
  H1: "h1",
  H2: "h2",
  ANNUAL: "annual",
  Q1: "q1",
  Q2: "q2",
  Q3: "q3",
  Q4: "q4",
  "9MONTHLY": "9monthly",
  MONTHLY: "monthly",
};

export const STATISTICS_FILTERS = {
  DECISION_TYPE: "decType",
  YEAR: "year",
  PERIOD: "period",
  MONTH: "month",
  BORDERCROSS_TYPE: "borderCross",
};

export const ANT_BTN_TYPES = {
  PRIMARY: "primary",
  DEFAULT: "default",
};
