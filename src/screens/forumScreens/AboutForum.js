import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, FAB, List, IconButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

import { fetchForum, fetchReplys, fetchReviews, getProduct } from '../../util/Https';
import { Colors } from '../../constants/styles';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../store/auth-context';

function AboutForum({ route, navigation }) {
    const { t } = useTranslation();

    const authCtx = useContext(AuthContext);
    const [forumList, setForumList] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const forumName = route.params?.forumId;

    function UpdateForumHandler(forumName) {
        navigation.navigate('UpdateForum', { forumId: forumName });
    }

    function addReplyHandler() {
        navigation.navigate('AddReview', { forumId: forumName })
    }

    function UpdateReplyHandler(replyName) {
        navigation.navigate('UpdateReview', { forumId: forumName, replyId: replyName });
    }

    useEffect(() => {
        async function getForum() {
            try {
                const forum = await fetchForum(forumName);
                const replys = await fetchReplys(forumName);
                setForumList(forum);
                setReplyList(replys);
            } catch (error) {
                console.log(t('fetchErrorTitle', t('fetchErrorMessage')));
            }
        }

        getForum();
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
                    <Card.Content>
                        <Text style={styles.itemTitle}>{forumList.fTitle}</Text>
                        <Text variant='bodyMedium'>{forumList.fMessage}</Text>
                        <View style={styles.rowContainer} >
                            <Text>{forumList.date}</Text>
                            {forumList.fAuthor === authCtx.nameInfo && forumList.fMail === authCtx.mailInfo ?
                                (<IconButton
                                    icon="pencil"
                                    iconColor={Colors.primary}
                                    onPress={() => { UpdateForumHandler(forumList.id) }}
                                    size={24}
                                />)
                                : (<Text style={styles.reviewAuthor}>{forumList.fAuthor}</Text>)
                            }
                        </View>
                    </Card.Content>
                </View>
            </Card>
            <FlatList
                data={replyList}
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
                                        onPress={() => { UpdateReplyHandler(item.id) }}
                                        size={24}
                                    />)
                                    : (<Text style={styles.reviewAuthor}>{item.rAuthor}</Text>)
                                }
                            </View>
                            <Text style={styles.reviewText}>{item.rMessage}</Text>
                            <View style={styles.rowReviewTitle}>
                                <Text style={styles.reviewDate}>{item.date}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
                keyExtractor={(item) => item.id}
            />
            <FAB
                icon="plus"
                label={t('addReview')}
                style={styles.fab}
                onPress={() => { addReplyHandler() }}
                backgroundColor={Colors.secondary}
                color={Colors.tint}
            />
        </View>
    );
}

export default AboutForum;

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
    specsContainer: {
        width: 380,
        height: 'auto'
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
        justifyContent: 'space-between'
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