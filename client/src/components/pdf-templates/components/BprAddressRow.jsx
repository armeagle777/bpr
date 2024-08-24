import { View } from "@react-pdf/renderer";

const BprAddressRow = ({ RegistrationData, RegistrationAddress }) => {
  const styles = StyleSheet.create({
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
  });
  return (
    <View style={styles.documentsRow} key={index}>
      <View style={styles.documentsRowIcon}>
        <Text style={styles.documentIconText}>
          {RegistrationData?.Registration_Status || ""}
        </Text>
        <Text style={styles.documentIconText}>
          {RegistrationData?.Registration_Type === "OLD" ? "Հին" : "ՆԵրկա"}
        </Text>
      </View>
      <View style={styles.documentsRowBody}>
        <Text style={styles.documentsBodyTitle}>
          {RegistrationAddress?.Region || ""}
          {", "}
          {(RegistrationAddress?.Community &&
            RegistrationAddress?.Community !== RegistrationAddress?.Region &&
            RegistrationAddress?.Community) ||
            ""}{" "}
          {RegistrationAddress?.Residence || ""}{" "}
          {RegistrationAddress?.Street || ""}{" "}
          {RegistrationAddress?.Building || ""}{" "}
          {RegistrationAddress?.Building_Type || ""}{" "}
          {RegistrationAddress?.Apartment || ""}
        </Text>
        <Text style={styles.documentsBodyText}>
          {RegistrationData?.Registration_Aim?.AimName || ""}
          {" :"}
          {RegistrationData?.Registration_Date || ""}{" "}
          {RegistrationData?.Registration_Department || ""}
        </Text>
      </View>
    </View>
  );
};

export default BprAddressRow;
