import { Page, Text, View, Font, Image, Document } from "@react-pdf/renderer";

import { styles } from "./templates.constants";
import AsideRow from "./components/AsideRow";
import BprAddressRow from "./components/BprAddressRow";
import BprDocumentRow from "./components/BprDocumentRow";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";
import { formatBprData } from "./templates.helpers";
import AsideBar from "./components/AsideBar";

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

const BPR = ({ data }) => {
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>ԲՊՌ Տեղեկանք</Text>
        </View>
        <View style={styles.container}>
          <AsideBar
            PNum={PNum}
            IsDead={IsDead}
            imageSrc={imageSrc}
            DeathDate={DeathDate}
            personInfo={personInfo}
            Citizenship_StoppedDate={Citizenship_StoppedDate}
          />
          <View style={styles.main}>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Փաստաթղթեր</Text>
              {validDocuments?.length > 0 &&
                validDocuments.map((doc) => (
                  <BprDocumentRow key={doc.Document_Number} doc={doc} />
                ))}
              {invalidDocuments?.length > 0 &&
                invalidDocuments.map((doc) => (
                  <BprDocumentRow key={doc.Document_Number} doc={doc} />
                ))}
            </View>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Գրանցման հասցեներ</Text>
              {addresses?.length > 0 &&
                addresses.map((addr, index) => {
                  const { RegistrationAddress, RegistrationData } = addr;
                  return (
                    <BprAddressRow
                      key={index}
                      RegistrationAddress={RegistrationAddress}
                      RegistrationDat={RegistrationData}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BPR;
