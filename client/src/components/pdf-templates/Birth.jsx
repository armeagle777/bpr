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
    padding: "200px 10px 10px",
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
    fontSize: 16,
  },
});

const Birth = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.header}>Ծննդյան գրանցման</Text>
      </View>
      <Image src="./birth.jpg" style={styles.imageOverlay} />
    </Page>
  </Document>
);

export default Birth;
