import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7ff",
    fontFamily: "Arial",
    fontSize: 12,
    color: "#6A6A6A",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: "10px",
    padding: "20px 10px",
  },
  aside: {
    width: "35%",
  },
  asideSection: {
    backgroundColor: "#fff",
    padding: "10px 5px",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  asideImage: {
    width: "70px",
    height: "80px",
    // borderRadius: "50%",
  },
  asideRow: {
    padding: "5px",
    marginTop: 5,
    borderTop: "0.5px solid #6A6A6A",
    width: "100%",
  },
  asideRowTitle: {
    fontFamily: "Arial",
    fontSize: 8,
    marginBottom: 6,
  },
  asideRowBody: {
    fontSize: 10,
  },
  main: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  mainSection: {
    backgroundColor: "#fff",
    padding: "10px 5px",
    display: "flex",
    justifyContent: "center",
    gap: 6,
    alignItems: "center",
    boxShadow:
      "0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)",
  },
  mainSectionTitle: {
    width: "100%",
    fontFamily: "Arial",
    fontSize: 8,
    fontWeight: "bold",
    paddingBottom: 4,
    borderBottom: "0.5px solid #6A6A6A",
  },
  documentsRow: {
    width: "100%",
    padding: 10,
    backgroundColor: "#dadada21",
    display: "flex",
    flexDirection: "row",
  },
  documentsRowIcon: {
    height: "30px",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRight: "0.5px solid #6A6A6A",
  },
  documentIconText: {
    fontSize: 8,
  },
  documentsRowBody: {
    width: "85%",
    paddingLeft: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  documentsBodyTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  documentsBodyText: {
    fontSize: 8,
  },
  documentColumn: {
    display: "flex",
    flexDirection: "column",
  },
  addressesRow: {
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  addressesRowIcon: {
    height: "30px",
    width: "20%",
  },
  addressesRowBody: {
    width: "80%",
  },
  title: {
    textAlign: "center",
    paddingTop: "10px",
    fontFamily: "Arial",
  },
});
