import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Colors } from '../../constants/styles';

const RegisterProgressBar = ({ progress }) => (
    <View style={styles.ProgressBarStyle}>
        <ProgressBar progress={progress} color={Colors.primary} />
    </View>
);

export default RegisterProgressBar;

const styles = StyleSheet.create({
    ProgressBarStyle: {
        paddingVertical: 8,
        paddingHorizontal: 64,
    }
})