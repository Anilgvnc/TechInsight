import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Card, Text, Searchbar } from 'react-native-paper';

import { ProductsContext } from '../store/products-context';
import { fetchProduct } from '../util/Https';
import { Colors } from '../constants/styles';

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
                console.log(error);
            }
        }

        getProducts();
    }, []);

    function itemClickHandler(id) {
        navigation.navigate('AboutProduct', {
            productId: id
        });
    }

    const [searchQuery, setSearchQuery] = useState();
    const [filteredProducts, setFilteredProducts] = useState();
    function handleChange(query) {
        setSearchQuery(query);
        if (query) {
            const filtered = productarr.filter(item =>
                item.pName.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(productarr);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <Searchbar
                placeholder="Search"
                style={{ marginBottom: 16 }}
                onChangeText={handleChange}
                value={searchQuery}
            />
            <FlatList
                data={searchQuery ? filteredProducts : productarr}
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
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        width: 380,
        height: 'auto',
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