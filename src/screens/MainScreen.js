import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/styles';
import { fetchProduct } from '../util/Https';
import { ProductsContext } from '../store/products-context';
import { Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
//import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { AD_MOB_ANDROID, AD_MOB_IOS } from '@env';


function MainScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const productsCtx = useContext(ProductsContext);
    const [productarr, setProductarr] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await fetchProduct();
                //productsCtx.setProduct(products);
                setProductarr(products);
            } catch (error) {
                console.log(t('fetchErrorTitle', t('fetchErrorMessage')));
            }
        }

        getProducts();
    }, []);

    function itemClickHandler(id) {
        navigation.navigate('AboutProduct', {
            productId: id
        });
        console.log(id);
    }

    /* TODO:
     <Card
                    style={styles.itemContainer}
                >
                    <BannerAd
                        unitId={Platform.OS === 'ios'
                            ? AD_MOB_IOS
                            : AD_MOB_ANDROID
                        }
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            networkExtras: {
                                collapsible: 'bottom',
                            },
                        }}
                    />
                </Card>
    */

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <ScrollView>
                <FlatList
                    data={productarr}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => { itemClickHandler(item.id) }}>
                            <Card
                                style={styles.itemContainer}
                            >
                                <View style={styles.rowContainer}>
                                    <Card.Cover style={styles.cover} source={{ uri: item.url }} />
                                    <View>
                                        <Card.Content>
                                            <Text style={styles.itemTitle}>{item.pName}</Text>
                                            <Text variant='bodyMedium'>{item.description}</Text>
                                        </Card.Content>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />

            </ScrollView>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        width: 356,
        height: 84,
        marginBottom: 6,
    },
    itemTitle: {
        fontSize: 24,
        color: Colors.secondary,
        marginBottom: 6
    },
    cover: {
        width: 64,
        height: 64,
    },
    rowContainer: {
        flexDirection: 'row'
    },
})