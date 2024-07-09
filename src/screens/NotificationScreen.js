import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { t } from 'i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NotificationScreen() {

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                margin: 16,
                justifyContent: 'center',
                alignItems: 'center',
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Text>{t('emptyNotification')}</Text>
        </View>
    );

}

export default NotificationScreen;

const styles = StyleSheet.create({
})