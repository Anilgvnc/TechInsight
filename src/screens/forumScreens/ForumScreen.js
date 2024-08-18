import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Card, Text, Searchbar, FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchForums } from '../../util/Https';
import { Colors } from '../../constants/styles';

function ForumScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [forumList, setForumList] = useState([]);

    useEffect(() => {
        async function getForums() {
            try {
                const forums = await fetchForums();
                setForumList(forums);
            } catch (error) {
                console.log(error);
            }
        }

        getForums();
    }, []);

    function itemClickHandler(id) {
        navigation.navigate('AboutForum', {
            forumId: id
        });
    }

    function addForumHandler() {
        navigation.navigate('AddForum');
    }

    //Searchbar query
    const [searchQuery, setSearchQuery] = useState();
    const [filteredProducts, setFilteredProducts] = useState();
    function handleChange(query) {
        setSearchQuery(query);
        if (query) {
            const filtered = forumList.filter(item =>
                item.fTitle.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(forumList);
        }
    }

    return (
        <View style={{
            flex: 1,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Searchbar
                placeholder="Search"
                style={{ marginBottom: 16 }}
                onChangeText={handleChange}
                value={searchQuery}
            />
            <FlatList
                data={searchQuery ? filteredProducts : forumList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { itemClickHandler(item.id) }}>
                        <Card
                            style={styles.itemContainer}
                        >
                            <Card.Content>
                                <Text style={styles.itemTitle}>{item.fTitle}</Text>
                                <View style={styles.rowContainer} >
                                    <Text>{item.date}</Text>
                                    <Text>{item.fAuthor}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
            <FAB
                icon="plus"
                label={t('addForum')}
                style={styles.fab}
                onPress={() => { addForumHandler() }}
                backgroundColor={Colors.secondary}
                color={Colors.tint}
            />
        </View>
    );
}

export default ForumScreen;

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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fab: {
        position: 'absolute',
        marginBottom: 28,
        marginEnd: 16,
        right: 0,
        bottom: 0,
    },
})