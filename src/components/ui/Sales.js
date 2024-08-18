import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Colors } from '../../constants/styles';

function Sales() {
    const steamApi = process.env.EXPO_PUBLIC_STEAM;
    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        async function getItems() {
            try {
                const response = await axios.get(steamApi);
                setItemList(response.data.specials.items);
            } catch (error) {
                console.error(error);
            }
        }

        getItems();
    }, []);

    return (
        <View>
            <FlatList
                data={itemList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        {item.discounted ? (
                            <Card style={styles.itemContainer} >
                                <Card.Cover source={{ uri: item.header_image }} />
                                <Card.Title title={item.name} />
                                <Card.Content style={styles.rowContainer}>
                                    <Text style={styles.discountContainer}>
                                        {'%' + item.discount_percent}
                                    </Text>
                                    <Text style={styles.originalPrice}>{(item.original_price / 100)}</Text>
                                    <Text style={styles.finalPrice}>{(item.final_price / 100)}</Text>
                                    <Text style={styles.finalPrice}>{item.currency}</Text>
                                </Card.Content>
                            </Card>
                        ) : (
                            <Card>
                                <Text>{t('emptyNotification')}</Text>
                            </Card>
                        )}

                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default Sales;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        width: 380,
        height: 'auto',
        marginBottom: 6,
    },
    salesText: {
        padding: 8,
        margin: 8,
        fontSize: 24,
        color: Colors.primary
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    discountContainer: {
        backgroundColor: Colors.checkBackground,
        color: Colors.check,
        padding: 8,
    },
    originalPrice: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        textDecorationLine: 'line-through',
        backgroundColor: Colors.priceBackground,
        color: Colors.tint
    },
    finalPrice: {
        paddingVertical: 8,
        paddingHorizontal: 2,
        backgroundColor: Colors.priceBackground,
        color: Colors.tint
    }
})