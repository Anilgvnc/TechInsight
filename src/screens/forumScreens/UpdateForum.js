import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { Button, Text } from "react-native-paper";
import { Formik } from 'formik';
import * as yup from 'yup';

import { Colors } from '../../constants/styles';
import Input from '../../components/authUi/Input';
import { deleteForum, fetchForum, updateForum } from '../../util/Https';
import { AuthContext } from '../../store/auth-context';
import { BlurView } from 'expo-blur';


const initialFormValues = {
    fAuthor: '',
    fMail: '',
    fTitle: '',
    fMessage: '',
    createdOn: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
};

function UpdateForum({ route, navigation }) {

    //fetch id from route
    const forumName = route.params?.forumId;

    const [isSending, setIsSending] = useState(false);
    const [forum, setForum] = useState({})

    //Set Author name
    const authCtx = useContext(AuthContext);
    initialFormValues.fAuthor = authCtx.nameInfo;

    const { t } = useTranslation();

    useEffect(() => {
        async function getForum() {
            try {
                const forumData = await fetchForum(forumName);
                setForum(forumData);
            } catch (error) {
                console.error(error);
            }
        }

        getForum();
    }, []);

    async function PostHandler(formValues) {
        setIsSending(true);
        try {
            await updateForum(forumName, formValues);
            //productsCtx.addProduct({ ...formValues, id: id })
            navigation.goBack();
        } catch (error) {
            Alert.alert(
                t('sentErrorTitle'),
                t('sentError')
            );
            console.log(error);
            setIsSending(false);
        }
    }

    const DeleteHandler = () =>
        Alert.alert(t('deleteAlertTitle'), t('deleteAlertMsg'), [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: t('ok'), onPress: () => {
                    setIsSending(true);
                    try {
                        deleteForum(forumName);
                        navigation.goBack();
                    } catch (error) {
                        Alert.alert(
                            t('sentErrorTitle'),
                            t('sentError')
                        );
                        console.log(error);
                        setIsSending(false);
                    }
                }
            },
        ]);

    return (
        <View style={styles.screen}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{ flex: 1 }}
            />
            <BlurView
                experimentalBlurMethod='dimezisBlurView'
                intensity={90}
                tint='light'
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '60%',
                    padding: 16,
                    bottom: 0
                }}
            >

                <View style={styles.headerContainer}>
                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge" style={styles.headertextStyle} >
                            {t('updateForumHeader')}
                        </Text>
                        <Text variant="titleMedium" style={styles.textStyle}>
                            {t('updateForumTitle')}
                        </Text>
                    </View>
                </View>
                <View style={styles.flexBody}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={PostHandler}
                        validationSchema={yup.object().shape({
                            rTitle: yup
                                .string()
                                .min(5)
                                .required(),
                            rMessage: yup
                                .string()
                                .min(5)
                                .required(),
                        })}>

                        {({ handleSubmit, handleChange, values, errors, setFieldTouched, touched, isValid }) => (
                            <Fragment>
                                <View>
                                    <View>
                                        <Input
                                            label={t('forumTitle')}
                                            placeholder={forum.fTitle}
                                            value={values.fTitle}
                                            onUpdateValue={handleChange('fTitle')}
                                            onBlur={() => setFieldTouched('fTitle')}
                                            isInvalid={touched.fTitle && errors.fTitle}
                                            invalidText={errors.fTitle}
                                        />
                                    </View>
                                    <View>
                                        <Input
                                            label={t('forumMessage')}
                                            placeholder={forum.fMessage}
                                            value={values.fMessage}
                                            onUpdateValue={handleChange('fMessage')}
                                            onBlur={() => setFieldTouched('fMessage')}
                                            isInvalid={touched.fMessage && errors.fMessage}
                                            invalidText={errors.fMessage}
                                            multiline={true}
                                        />
                                    </View>
                                </View>

                                <View style={styles.buttonStyle}>
                                    <Button
                                        mode="elevated"
                                        buttonColor={Colors.secondary}
                                        textColor={Colors.tint}
                                        onPress={handleSubmit}
                                        disabled={!isValid || isSending}
                                        loading={isSending}
                                    >
                                        {t('send')}
                                    </Button>
                                </View>
                            </Fragment>

                        )}
                    </Formik>
                    <View style={styles.buttonStyle}>
                        <Button
                            mode="elevated"
                            buttonColor={Colors.red}
                            textColor={Colors.tint}
                            icon={'comment-remove'}
                            onPress={DeleteHandler}
                            disabled={isSending}
                            loading={isSending}
                        >
                            {t('delete')}
                        </Button>
                    </View>
                </View>
            </BlurView>
        </View>
    );
}

export default UpdateForum;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    flexBody: {
        flex: 6
    },
    textContainer: {
        flex: 3
    },
    headertextStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    buttonStyle: {
        padding: 16,
    },
    line: {
        marginTop: 156,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        marginBottom: 10,
    },
    registerTextStyle: {
        textAlign: 'center'
    },
    rating: {
        margin: 16
    }
})