import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { fetchProduct, getProduct } from '../../util/Https';
import { Colors } from '../../constants/styles';
//import { ProductsContext } from '../../store/products-context';

function AboutProduct({ route, navigation }) {
    const insets = useSafeAreaInsets();

    //const productsCtx = useContext(ProductsContext);
    const [productarr, setProductarr] = useState([]);
    const productName = route.params?.productId;


    useEffect(() => {
        async function getProducts() {
            try {
                const products = await getProduct(productName);
                //productsCtx.setProduct(products);
                setProductarr(products);
            } catch (error) {
                console.log(t('fetchErrorTitle', t('fetchErrorMessage')));
            }
        }

        getProducts();
    }, []);


    /* 
    <ScrollView>
                <FlatList
                    data={productarr.reviews}
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
                                            <Text style={styles.itemTitle}>{item.title}</Text>
                                            <Text variant='bodyMedium'>{item.message}</Text>
                                        </Card.Content>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
    */

    return (
        <View
            style={{
                flex: 1,
                padding: 16,
                alignItems: 'center',
            }}
        >
            <Card
                style={styles.itemContainer}
            >
                <View style={styles.rowContainer}>
                    <Card.Cover style={styles.cover} source={{ uri: productarr.url }} />
                    <View>
                        <Card.Content>
                            <Text style={styles.itemTitle}>{productarr.pName}</Text>
                            <Text variant='bodyMedium'>{productarr.description}</Text>
                        </Card.Content>
                    </View>
                </View>
            </Card>

        </View>
    );
}

export default AboutProduct;

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