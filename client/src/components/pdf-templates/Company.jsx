import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
    },
});

const Company = ({ data }) => (
    <Document>
        <Page>
            <View style={styles.container}>
                <Text>Company DATA</Text>
                <Text style={styles.text}>{JSON.stringify(data)} </Text>
            </View>
        </Page>
    </Document>
);

export default Company;
