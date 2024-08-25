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
} from "./templates.constants";
import { checkSamePerson } from "./templates.helpers";

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

  const areSamePerson = checkSamePerson({ presenter, person, person2 });

  return (
    <Document>
      <Page size="A4" style={qkagDocStyles.page}>
        <View style={qkagDocStyles.container}>
          <View style={qkagDocStyles.title}>
            <Text style={qkagDocStyles.header}>
              {type ? QkagDocNameMaps[type]["name"] : ""}
            </Text>
          </View>
          {child && <PersonSection {...child} title={"Քաղաքացի"} />}
          {person && <PersonSection {...person} title={"հայրը"} />}
          {person2 && <PersonSection {...person2} title={"մայրը"} />}
          {presenter && !areSamePerson && (
            <PersonSection {...presenter} title={"Ներկայացուցիչ"} />
          )}
          {med && <MedSection {...med} title={"Բժշկական հաստատություն"} />}
        </View>
        <Image src={bgImage} style={qkagDocStyles.imageOverlay} />
      </Page>
    </Document>
  );
};

export default Qkag;
