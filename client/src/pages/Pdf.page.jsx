import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import BPR from "../components/pdf-templates/BPR";
import Qkag from "../components/pdf-templates/Qkag";

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
      <Qkag />
    </PDFViewer>
  );
};

export default Pdf;
