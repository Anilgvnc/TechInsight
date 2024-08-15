import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, IconButton, MD2Colors, useTheme, Card } from 'react-native-paper';

import { AuthContext } from '../store/auth-context';
import { PreferencesContext } from '../store/ThemeContext';

import { useTranslation } from 'react-i18next';
import TranslationButton from '../components/ui/TranslationButton';
import { Colors } from '../constants/styles';
import UpdatesCheck from '../components/ui/Updates';

function SettingsScreen() {
    const authCtx = useContext(AuthContext);
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = useContext(PreferencesContext);

    const { t } = useTranslation();

    return (
        <View style={styles.screen}>
            <Card mode='outlined'>
                <Card.Content>
                    <Text variant='titleMedium' style={styles.textStyle} >{t('updates')}</Text>
                    <UpdatesCheck />
                </Card.Content>
            </Card>
            <Card mode='outlined'>
                <Card.Content style={styles.settingsContent}>
                    <Text variant='titleMedium' style={styles.textStyle} >{t('language')}</Text>
                    <TranslationButton />
                </Card.Content>
            </Card>
            <Card mode='outlined'>
                <Card.Content style={styles.settingsContent}>
                    <Text variant='headerMedium' style={styles.textStyle} >{t('application-theme')}</Text>
                    <Switch
                        color={'red'}
                        value={isThemeDark}
                        onValueChange={toggleTheme}
                    />
                </Card.Content>
            </Card>
            <Card mode='outlined'>
                <Card.Content style={styles.settingsContent}>
                    <Text variant='headerMedium' style={styles.textStyle} >{t('logout')}</Text>
                    <IconButton
                        icon="exit-to-app"
                        iconColor={Colors.red}
                        size={25}
                        onPress={authCtx.logout}
                    />
                </Card.Content>
            </Card>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    settingsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})