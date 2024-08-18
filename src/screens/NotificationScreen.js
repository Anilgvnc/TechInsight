import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { t } from 'i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../constants/styles';
import Sales from '../components/ui/Sales';
import { List } from 'react-native-paper';

function NotificationScreen() {

    const insets = useSafeAreaInsets();

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
            <List.Section style={styles.itemContainer}>
                <List.Accordion
                    title={t('sales')}
                    left={props => <List.Icon {...props} icon="sale" />}
                >
                    <Sales />
                </List.Accordion>
            </List.Section>
        </View>
    );

}

export default NotificationScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 12,
        width: 400,
        height: 'auto',
        marginBottom: 6,
    },
    salesText: {
        padding: 8,
        margin: 8,
        fontSize: 24,
        color: Colors.primary
    }
})