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
