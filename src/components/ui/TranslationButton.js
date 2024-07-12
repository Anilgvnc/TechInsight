import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, IconButton } from 'react-native-paper';

import i18next, { languageResources } from '../../services/i18next';
import languagesList from '../../services/languagesList.json'
import { Colors } from '../../constants/styles';

function TranslationButton() {

    const [visible, setVisible] = useState(false);

    const changeLng = lng => {
        i18next.changeLanguage(lng);
        setVisible(false);
    };

    return (
        <View>
            <View>
                <Portal>
                    <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={modalStyles.modalContainer}>
                        <View style={modalStyles.languagesList}>
                            <FlatList
                                data={Object.keys(languageResources)}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={modalStyles.languageButton}
                                        onPress={() => changeLng(item)}>
                                        <Text style={modalStyles.lngName}>
                                            {languagesList[item].nativeName}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </Modal>
                </Portal>
            </View>
            <IconButton
                icon="translate"
                size={25}
                onPress={() => setVisible(true)}
            />
        </View>
    );
}

export default TranslationButton;

const modalStyles = StyleSheet.create({
    languagesList: {
        backgroundColor: Colors.secondary,
        borderRadius: 16,
    },
    modalContainer: {
        padding: 16,
        width: '100%',
    },
    languageButton: {
        padding: 16,
        borderBottomColor: Colors.tint,
        borderBottomWidth: 1,
    },
    lngName: {
        fontSize: 16,
        color: Colors.tint,
    },
})