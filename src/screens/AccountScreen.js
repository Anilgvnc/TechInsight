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
            <Card style={styles.body}>
                <Card.Content>

                    <List.Item
                        title="User Name"
                        description={authCtx.nameInfo}
                        left={props => <Avatar.Image style={styles.avatar} size={64} source={require('../../assets/icon.png')} color='000000' alignContent='center' />}
                    />
                    <List.Item
                        title="E-mail"
                        description={authCtx.mailInfo}
                        left={props => <List.Icon {...props} icon="email" />}
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
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.50,
        marginRight: 16
    },
    body: {
        marginBottom: 8,
        borderRadius: 16,
    },
})