import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Text, FAB, Button, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

import { fetchProduct, getProduct } from '../../util/Https';
import { Colors } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
//import { ProductsContext } from '../../store/products-context';

function AboutProduct({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    //const productsCtx = useContext(ProductsContext);
    const [productarr, setProductarr] = useState([]);
    const productName = route.params?.productId;

    function addReviewHandler({ id }) {
        navigation.navigate('AddReview', { productId: id })

    }

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
                        <Card.Actions>
                            <Rating
                                imageSize={20}
                                readonly
                                onFinishRating={this.ratingCompleted}
                                style={styles.rating}
                                backgroundColor={Colors.shadow}
                            />
                        </Card.Actions>
                    </View>
                </View>
            </Card>
            <View>
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
            </View>
            <FAB
                icon="plus"
                label={t('addReview')}
                style={styles.fab}
                onPress={() => { addReviewHandler(productName) }}
                backgroundColor={Colors.secondary}
                color={Colors.tint}
            />
        </View>
    );
}

export default AboutProduct;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        width: 356,
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
    rating: {
        padding: 8
    },
    fab: {
        position: 'absolute',
        marginBottom: 40,
        marginEnd: 18,
        right: 0,
        bottom: 0,
    },
})