import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';

function AccountScreen() {

    const insets = useSafeAreaInsets();

    const authCtx = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                margin: 16,
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Card>
                <Card.Content style={styles.cardContainer}>
                    <View style={styles.avatar}>
                        <Avatar.Image size={108} source={require('../../assets/icon.png')} color='000000' alignContent='center' />
                    </View>
                    <Text style={styles.username}> {authCtx.nameInfo} </Text>
                </Card.Content>
            </Card>
            <Card style={styles.body}>
                <Card.Content>
                    <List.Item
                        title="E-mail"
                        description={authCtx.mailInfo}
                        left={props => <List.Icon {...props} icon="email" />}
                    />
                    <List.Item
                        title="Phone"
                        description="Item description"
                        left={props => <List.Icon {...props} icon="phone" />}
                    />
                    <List.Item
                        title="Total reviews"
                        description="Item description"
                        left={props => <List.Icon {...props} icon="badge-account" />}
                    />
                </Card.Content>
            </Card>
        </View>
    );

}

export default AccountScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    cardContainer: {
        flexDirection: 'row',
    },
    avatar: {
        flex: 4,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.50,
    },
    username: {
        flex: 6,
        color: Colors.secondary,
        fontSize: 32,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    body: {
        marginTop: 16,
        marginBottom: 32,
    },
})