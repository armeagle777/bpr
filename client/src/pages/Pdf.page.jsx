import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import BPR from '../components/pdf-templates/BPR';
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
            <BPR />
        </PDFViewer>
    );
};

export default Pdf;
