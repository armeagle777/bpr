import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import birthImage from "../../assets/birth.jpg";
import { documentNames } from "../../utils/constants";

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#6A6A6A",
  },
  content: {
    flexGrow: 1,
    padding: "200px 0 0 20px",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  header: {
    textAlign: "center",
    fontSize: 14,
    // fontFamily: "Arial",
    fontWeight: "bold",
  },
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
  } = data;

  const PersonRow = ({}) => {
    return (
      <View>
        <Text style={styles.header}>Person</Text>
        <Text>Left</Text>
        <Text>Right</Text>
      </View>
    );
  };

  const MedRow = ({}) => {
    return (
      <View>
        <Text style={styles.header}>Med</Text>
        <Text>Left</Text>
        <Text>Right</Text>
      </View>
    );
  };

  const areSamePerson = ({ presenter, person, person2 }) => {
    return (
      (presenter?.base_info?.name === person?.base_info?.name &&
        presenter?.base_info?.last_name === person?.base_info?.last_name) ||
      (presenter?.base_info?.name === person2?.base_info?.name &&
        presenter?.base_info?.last_name === person2?.base_info?.last_name)
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text style={styles.header}>{documentNames[type]["name"]}</Text>
        </View>
        {person && <PersonRow />}
        {person2 && <PersonRow />}
        {child && <PersonRow />}
        {presenter && !areSamePerson({ presenter, person, person2 }) && (
          <PersonRow />
        )}
        {med && <MedRow />}
        <Image src={birthImage} style={styles.imageOverlay} />
      </Page>
    </Document>
  );
};

export default Qkag;
