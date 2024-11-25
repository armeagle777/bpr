import { Page, Text, View, Font, Document } from "@react-pdf/renderer";

import {
  TEMP_3_FAKE_DATA,
  // TEMP_3_STYLES
} from "./templates.constants";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { formatBprData, formatDate } from "./templates.helpers";

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

const TEMP_3_STYLES = {
  page: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: "10px",
    padding: "20px 10px",
  },
  title: {
    border: "1px solid red",
  },
};

const CitizenshipTemplate = ({ data, userFullName }) => {
  const {
    IsDead,
    DeathDate,
    PNum = "",
    documents,
    addresses = [],
    Citizenship_StoppedDate,
  } = { ...data };

  const {
    ctzText,
    imageSrc,
    personInfo,
    fullAddress,
    birthRegion,
    currentAddress,
    validDocuments,
    invalidDocuments,
  } = formatBprData({ addresses, documents });
  const currentDate = formatDate(new Date());

  return (
    <Document>
      <Page size="A4" style={TEMP_3_STYLES.page} orientation="landscape">
        <View style={TEMP_3_STYLES.title}>
          <Text>Ձև N3</Text>
        </View>
        <View style={TEMP_3_STYLES.container}>
          <View style={TEMP_3_STYLES.main}></View>
        </View>
        <View style={TEMP_3_STYLES.footer}>
          <Text>
            Տեղեկանքը գեներացվել է ՄՔԾ ներքին որոնման համակարգում օգտատիրոջ
            կողմից {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CitizenshipTemplate;
