import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "GHEA-grapalat",
  src: "/Fonts/GHEAGrpalatReg.otf",
});

Font.register({
  family: "GHEA-grapalat-italic",
  src: "/Fonts/GHEAGrapalatRit.otf",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f7ff",
    fontFamily: "GHEA-grapalat",
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
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  asideRow: {
    padding: "5px",
    marginTop: 5,
    borderTop: "0.5px solid #6A6A6A",
    width: "100%",
  },
  asideRowTitle: {
    fontFamily: "GHEA-grapalat-italic",
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
    fontFamily: "GHEA-grapalat",
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
    width: "15%",
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
});

const BPR = ({ data }) => {
  const {
    Citizenship_StoppedDate,
    DeathDate,
    IsDead,
    PNum = "",
    addresses,
    documents,
  } = { ...data };

  const validDocuments = documents.filter(
    (d) =>
      d.Document_Status === "VALID" || d.Document_Status === "PRIMARY_VALID"
  );
  const invalidDocuments = documents.filter(
    (d) => d.Document_Status === "INVALID"
  );
  const currentAddress =
    addresses.find((a) => a.RegistrationData.Registration_Type === "CURRENT") ||
    addresses[0];

  const { RegistrationAddress } = { ...currentAddress };
  const {
    Apartment = "",
    Building = "",
    Building_Type = "",
    Community = "",
    LocationCode = "",
    Postal_Index = "",
    Region = "",
    Residence = "",
    Street = "",
  } = { ...RegistrationAddress };

  const regionCommunity =
    Region === Community ? Region : Region + ", " + Community;

  const fullAddress =
    regionCommunity +
      ", " +
      Residence +
      " " +
      Street +
      " " +
      Building +
      Building_Type +
      " - " +
      Apartment || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.aside}>
            <View style={styles.asideSection}>
              <Image src="/male.png" style={styles.asideImage} />
              <Text>Վարդգես Գասպարի</Text>
              <Text> Վարպետի</Text>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>Ծննդ. ամսաթիվ</Text>
                <Text style={styles.asideRowBody}>12/12/2000թ.</Text>
              </View>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>ՀԾՀ</Text>
                <Text style={styles.asideRowBody}>{PNum}</Text>
              </View>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>Ազգություն</Text>
                <Text style={styles.asideRowBody}>ՀԱՅ</Text>
              </View>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>Քաղաքացիություն</Text>
                <Text style={styles.asideRowBody}>ՀՀ</Text>
              </View>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>Ծննդավայր</Text>
                <Text style={styles.asideRowBody}>ԵՐԵՎԱՆ</Text>
              </View>
              <View style={styles.asideRow}>
                <Text style={styles.asideRowTitle}>Հասցե</Text>
                <Text style={styles.asideRowBody}>
                  {currentAddress && fullAddress}
                </Text>
              </View>
              {Citizenship_StoppedDate && (
                <View style={styles.asideRow}>
                  <Text style={styles.asideRowTitle}>
                    Քաղաքացիությունը դադարացրել է
                  </Text>
                  <Text style={styles.asideRowBody}>
                    {Citizenship_StoppedDate}
                  </Text>
                </View>
              )}
              {IsDead && (
                <View style={styles.asideRow}>
                  <Text style={styles.asideRowTitle}>Մահացել է</Text>
                  {DeathDate && (
                    <Text style={styles.asideRowBody}>{DeathDate}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.main}>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Փաստաթղթեր</Text>
              <View style={styles.documentsRow}>
                <View style={styles.documentsRowIcon}>
                  <Text style={styles.documentIconText}>Անվավեր</Text>
                  <Text style={styles.documentIconText}>Անձնագիր</Text>
                </View>
                <View style={styles.documentsRowBody}>
                  <Text style={styles.documentsBodyTitle}>
                    Գասպարի Վարդգես Վարպետի
                  </Text>
                  <Text style={styles.documentsBodyText}>
                    AV0536594 07/11/2022 012 07/11/2032
                  </Text>
                </View>
              </View>
              <View style={styles.documentsRow}>
                <View style={styles.documentsRowIcon}>
                  <Text style={styles.documentIconText}>Վավեր</Text>
                  <Text style={styles.documentIconText}>ID քարտ</Text>
                </View>
                <View style={styles.documentsRowBody}>
                  <Text style={styles.documentsBodyTitle}>
                    Գասպարի Վարդգես Վարպետի
                  </Text>
                  <Text style={styles.documentsBodyText}>
                    AV0536594 07/11/2022 012 07/11/2032
                  </Text>
                </View>
              </View>
              <View style={styles.documentsRow}>
                <View style={styles.documentsRowIcon}>
                  <Text style={styles.documentIconText}>Վավեր</Text>
                  <Text style={styles.documentIconText}>Անձնագիր</Text>
                </View>
                <View style={styles.documentsRowBody}>
                  <Text style={styles.documentsBodyTitle}>
                    Գասպարի Վարդգես Վարպետի
                  </Text>
                  <Text style={styles.documentsBodyText}>
                    AV0536594 07/11/2022 012 07/11/2032
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Գրանցման հասցեներ</Text>
              <View style={styles.addressesRow}>
                <View style={styles.addressesRowIcon}></View>
                <View style={styles.addressesRowBody}>
                  <Text>Test</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BPR;
