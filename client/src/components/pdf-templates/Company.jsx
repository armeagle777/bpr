import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';

Font.register({
    family: 'Sans-serif',
    src: '/Fonts/FreeSans.ttf',
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Sans-serif',
    },
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
        <Page style={styles.page}>
            <View style={styles.container}>
                <Text>Company DATA</Text>
                <Text style={styles.text}>{data.name_am}</Text>
            </View>
        </Page>
    </Document>
);

export default Company;
