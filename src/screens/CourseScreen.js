import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import CourseDataTable from '../components/ui/CourseDataTable';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/styles';


function CourseScreen() {
    const { t } = useTranslation();

    const [courseData] = useState([
        {
            key: 1,
            courseName: "hiphop",
            branch: "hiphop",
            duration: "1 month",
            grade: "1.level",
            endDate: "31.09.2023",
            instructor: "Ersin",
        },
    ]);

    return (
        <View style={styles.screen}>
            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Text variant="headlineMedium" style={styles.headertextStyle} >
                        {t('ongoingCourses')}
                    </Text>
                    <CourseDataTable />
                </Card>
            </View>
            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Text variant="headlineMedium" style={styles.headertextStyle} >
                        {t('expiredCourses')}
                    </Text>
                    <CourseDataTable />
                </Card>
            </View>
        </View>
    );
}

export default CourseScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 8,
    },
    cardContainer: {
        marginBottom: 32,
    },
    card: {
        padding: 8,
    },
    headertextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
})