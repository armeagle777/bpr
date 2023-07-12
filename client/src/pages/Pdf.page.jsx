import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Birth from '../components/pdf-templates/Birth';
import Divorce from '../components/pdf-templates/Divorce';
import Marriage from '../components/pdf-templates/Marriage';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    pdfContainer: {
        width: '100%',
        height: '100vh',
    },
});

const Pdf = () => {
    return (
        <PDFViewer style={styles.pdfContainer}>
            <Marriage />
        </PDFViewer>
    );
};

export default Pdf;
