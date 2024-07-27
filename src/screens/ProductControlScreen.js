import React, { useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, StyleSheet } from 'react-native';
import { Button, Card, List, Text } from 'react-native-paper';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/styles';
import axios from 'axios';


function ProductControl() {
    const { t } = useTranslation();

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState('');
    const [product, setProduct] = useState(null);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setBarcode(data);
        FetchProductInfo(data);
    };

    async function FetchProductInfo(barcode) {
        try {
            const response = await axios.get(process.env.UPCITEM_URL + barcode);
            setProduct(response.data.items[0]);
        } catch (error) {
            console.error(error);
        }
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.screen}>
                <Text>{t('ignoredRequestMessage')}</Text>
                <Button onPress={requestPermission}>Grant permission</Button>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.cardContainer}>
                <View style={styles.headerContainer}>
                    <Text variant="headlineLarge" style={styles.headerStyle} >
                        {t('prodContrHead')}
                    </Text>
                </View>
                <CameraView
                    style={styles.camera}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["pdf417", "upc_E", "code39", "aztec", "codabar", "code128", "code93", "datamatrix", "ean13", "ean8", "itf14", "upc_a"]
                    }}
                />
                {scanned && (
                    <View>
                        <Button
                            onPress={() => { setScanned(false); setProduct(null) }}
                            mode="elevated"
                            icon="barcode-scan"
                            buttonColor={Colors.secondary}
                            textColor={Colors.tint}
                        >Scan again</Button>
                        <List.Item
                            title="Barcode"
                            description={barcode}
                            left={props => <List.Icon {...props} icon="barcode" />}
                        />
                    </View>
                )}
                {product && (
                    <View>
                        <List.Item
                            title="Product Name"
                            description={product.title}
                            left={props => <List.Icon {...props} icon="barcode" />}
                        />
                        <List.Item
                            title="Brand"
                            description={product.brand}
                            left={props => <List.Icon {...props} icon="barcode" />}
                        />
                        <List.Item
                            title="Description"
                            description={product.description}
                            left={props => <List.Icon {...props} icon="barcode" />}
                        />
                    </View>
                )}
            </Card>
            <Card style={styles.cardContainer} >
                <Text variant="titleMedium" style={styles.textStyle}>
                    {t('prodContrDisclaimer')}
                </Text>
            </Card>
        </View>
    );
}

export default ProductControl;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        flexDirection: 'column',
        marginBottom: 16
    },
    headerStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary,
        textAlign: 'center'
    },
    cardContainer: {
        padding: 16,
        width: 368,
        marginTop: 6
    },
    camera: {
        borderRadius: 16,
        width: 336,
        height: 160
    },
    headertextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
})