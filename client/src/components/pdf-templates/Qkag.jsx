import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";

import PersonSection from "./components/PersonSection";
import MedSection from "./components/MedSection";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import bgImage from "../../assets/qkag.png";

import {
  QKAG_FAKE_DATA,
  QkagDocNameMaps,
  qkagDocStyles,
  styles,
} from "./templates.constants";
import { checkSamePerson, formatDate } from "./templates.helpers";

Font.register({
  family: "Arial",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    {
      src: Arial,
    },
    {
      src: BoldArial,
      fontWeight: "bold",
    },
  ],
});

const Qkag = ({ data }) => {
  const {
    type,
    office_name,
    cert_num,
    cert_num2,
    cert_date,
    full_ref_num,
    person,
    person2,
    child,
    children,
    presenter,
    med,
  } = data ? { ...data } : QKAG_FAKE_DATA;
  const currentUser = "Վ. Մաթևոսյան";
  const currentDate = formatDate(new Date());
  const areSamePerson = checkSamePerson({ presenter, person, person2 });

  return (
    <Document>
      <Page size="A4" style={qkagDocStyles.page}>
        <View style={qkagDocStyles.container}>
          <View style={qkagDocStyles.titleContainer}>
            <Text style={qkagDocStyles.header}>ՊԵՏԱԿԱՆ ՎԿԱՅԱԿԱՆ</Text>
            <Text style={qkagDocStyles.header}>
              {type ? QkagDocNameMaps[type]["name"] : ""}
            </Text>
          </View>
          {child && (
            <PersonSection
              {...child}
              title={QkagDocNameMaps[type]["child"] || "Քաղաքացի"}
            />
          )}
          {person && (
            <PersonSection
              {...person}
              title={QkagDocNameMaps[type]["person"] || "հայրը"}
            />
          )}
          {person2 && (
            <PersonSection
              {...person2}
              title={QkagDocNameMaps[type]["person2"] || "մայրը"}
            />
          )}
          {presenter && !areSamePerson && (
            <PersonSection {...presenter} title={"Ներկայացուցիչ"} />
          )}
          {med?.institution_name && (
            <MedSection {...med} title={"Բժշկական հաստատություն"} />
          )}
        </View>
        <View style={qkagDocStyles.footer}>
          <Text>Վկայականի N : {cert_num}</Text>
          <Text>Վկայականի ա/թ : {cert_date}</Text>
        </View>
        <View style={styles.waterMarkContainer}>
          <Text style={styles.waterMark}>
            Տեղեկանքը գեներացվել է ՄՔԾ ներքին որոնման համակարգում {currentUser}
            օգտատերի կողմից {currentDate}
          </Text>
        </View>
        <Image src={bgImage} style={qkagDocStyles.imageOverlay} />
      </Page>
    </Document>
  );
};

export default Qkag;