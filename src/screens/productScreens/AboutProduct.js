import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, FAB, List, IconButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

import { fetchReviews, getProduct } from '../../util/Https';
import { Colors } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../store/auth-context';
//import { ProductsContext } from '../../store/products-context';

function AboutProduct({ route, navigation }) {
    const { t } = useTranslation();

    //const productsCtx = useContext(ProductsContext);
    const authCtx = useContext(AuthContext);
    const [productarr, setProductarr] = useState([]);
    const [reviewsArr, setReviewsArr] = useState([]);
    const productName = route.params?.productId;

    function addReviewHandler() {
        navigation.navigate('AddReview', { productId: productName })
    }

    function UpdateReviewHandler(reviewName) {
        navigation.navigate('UpdateReview', { productId: productName, reviewId: reviewName });
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await getProduct(productName);
                const reviews = await fetchReviews(productName);
                //productsCtx.setProduct(products);
                setProductarr(products);
                setReviewsArr(reviews);
            } catch (error) {
                console.log(t('fetchErrorTitle', t('fetchErrorMessage')));
            }
        }

        getProducts();
    }, []);

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
            <List.Section style={styles.itemContainer} >
                <List.Accordion
                    title={t('techSpecs')}
                    left={props => <List.Icon {...props} icon="information-outline" />}
                >
                    <Card></Card>
                </List.Accordion>
            </List.Section>
            <List.Section style={styles.itemContainer} >
                <List.Accordion
                    title={t('reviews')}
                    left={props => <List.Icon {...props} icon="message" />}
                >
                    <FlatList
                        data={reviewsArr}
                        renderItem={({ item }) => (
                            <Card
                                style={styles.reviewContainer}
                            >
                                <Card.Content>
                                    <View style={styles.rowReviewTitle}>
                                        <Text style={styles.reviewTitle}>{item.rTitle}</Text>
                                        {item.rAuthor === authCtx.nameInfo && item.rMail === authCtx.mailInfo ?
                                            (<IconButton
                                                icon="pencil"
                                                iconColor={Colors.primary}
                                                onPress={() => { UpdateReviewHandler(item.id) }}
                                                size={24}
                                            />)
                                            : (<Text style={styles.reviewAuthor}>{item.rAuthor}</Text>)
                                        }
                                    </View>
                                    <Text style={styles.reviewText}>{item.rMessage}</Text>
                                    <View style={styles.rowReviewTitle}>
                                        <Text style={styles.reviewDate}>{item.date}</Text>
                                        <Rating
                                            imageSize={16}
                                            style={styles.rating}
                                            readonly
                                            startingValue={item.rRate}
                                            backgroundColor={Colors.shadow}
                                        />
                                    </View>
                                </Card.Content>
                            </Card>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </List.Accordion>
            </List.Section>
            <FAB
                icon="plus"
                label={t('addReview')}
                style={styles.fab}
                onPress={() => { addReviewHandler() }}
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
        width: 400,
        height: 'auto',
        marginBottom: 6,
    },
    reviewContainer: {
        width: 308,
        height: 'auto',
        marginBottom: 4
    },
    itemTitle: {
        fontSize: 24,
        color: Colors.secondary,
        marginBottom: 6
    },
    reviewAuthor: {
        fontSize: 16,
        color: Colors.primary,
    },
    reviewTitle: {
        fontSize: 16,
        color: Colors.secondary
    },
    reviewText: {
        fontSize: 13,
        marginBottom: 4,
        marginTop: 4
    },
    cover: {
        width: 64,
        height: 64,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    rowReviewTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewDate: {
        textAlign: 'right',
        color: Colors.primary,
        fontSize: 12
    },
    fab: {
        position: 'absolute',
        marginBottom: 40,
        marginEnd: 18,
        right: 0,
        bottom: 0,
    },
})