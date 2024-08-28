import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import BPR from "../components/pdf-templates/BPR";
import NewQkag from "../components/pdf-templates/NewQkag";

const styles = StyleSheet.create({
  pdfContainer: {
    width: "100%",
    height: "100vh",
  },
});

const Pdf = () => {
  return (
    <PDFViewer style={styles.pdfContainer}>
      {/* <BPR /> */}
      <NewQkag />
    </PDFViewer>
  );
};

export default Pdf;
