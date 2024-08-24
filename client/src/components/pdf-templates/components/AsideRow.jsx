import { StyleSheet, Text, View } from "@react-pdf/renderer";

const AsideRow = ({ label, text }) => {
  const styles = StyleSheet.create({
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
  });

  return (
    <View style={styles.asideRow}>
      <Text style={styles.asideRowTitle}>{label}</Text>
      <Text style={styles.asideRowBody}>{text}</Text>
    </View>
  );
};

export default AsideRow;
